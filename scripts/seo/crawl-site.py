#!/usr/bin/env python3
"""
Simple site crawler to audit SEO issues
"""
import os
import re
import json
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

class SEOParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = None
        self.meta_description = None
        self.canonical = None
        self.og_tags = {}
        self.h1_tags = []
        self.h2_tags = []
        self.images_without_alt = []
        self.has_schema = False
        self.hreflang = []
        self.in_title = False
        self.in_h1 = False
        self.in_h2 = False
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        if tag == 'title':
            self.in_title = True
        elif tag == 'meta':
            name = attrs_dict.get('name', '').lower()
            prop = attrs_dict.get('property', '').lower()
            content = attrs_dict.get('content', '')
            
            if name == 'description':
                self.meta_description = content
            elif prop.startswith('og:'):
                self.og_tags[prop] = content
        elif tag == 'link':
            rel = attrs_dict.get('rel', '').lower()
            href = attrs_dict.get('href', '')
            
            if rel == 'canonical':
                self.canonical = href
            elif rel == 'alternate' and 'hreflang' in attrs_dict:
                self.hreflang.append({
                    'hreflang': attrs_dict['hreflang'],
                    'href': href
                })
        elif tag == 'script':
            if attrs_dict.get('type') == 'application/ld+json':
                self.has_schema = True
        elif tag == 'h1':
            self.in_h1 = True
        elif tag == 'h2':
            self.in_h2 = True
        elif tag == 'img':
            if 'alt' not in attrs_dict or not attrs_dict['alt'].strip():
                self.images_without_alt.append(attrs_dict.get('src', 'unknown'))
    
    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        elif tag == 'h1':
            self.in_h1 = False
        elif tag == 'h2':
            self.in_h2 = False
    
    def handle_data(self, data):
        if self.in_title:
            self.title = data.strip()
        elif self.in_h1:
            self.h1_tags.append(data.strip())
        elif self.in_h2:
            self.h2_tags.append(data.strip())

def analyze_html_file(file_path):
    """Analyze a single HTML file for SEO issues"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parser = SEOParser()
    try:
        parser.feed(content)
    except:
        pass
    
    issues = []
    
    # Check title
    if not parser.title:
        issues.append({'type': 'missing_title', 'severity': 'critical'})
    elif len(parser.title) < 30:
        issues.append({'type': 'title_too_short', 'severity': 'warning', 'value': len(parser.title)})
    elif len(parser.title) > 60:
        issues.append({'type': 'title_too_long', 'severity': 'warning', 'value': len(parser.title)})
    
    # Check meta description
    if not parser.meta_description:
        issues.append({'type': 'missing_meta_description', 'severity': 'critical'})
    elif len(parser.meta_description) < 120:
        issues.append({'type': 'meta_description_too_short', 'severity': 'warning', 'value': len(parser.meta_description)})
    elif len(parser.meta_description) > 160:
        issues.append({'type': 'meta_description_too_long', 'severity': 'warning', 'value': len(parser.meta_description)})
    
    # Check canonical
    if not parser.canonical:
        issues.append({'type': 'missing_canonical', 'severity': 'high'})
    elif not parser.canonical.strip():
        issues.append({'type': 'empty_canonical', 'severity': 'high'})
    
    # Check H1
    if len(parser.h1_tags) == 0:
        issues.append({'type': 'missing_h1', 'severity': 'high'})
    elif len(parser.h1_tags) > 1:
        issues.append({'type': 'multiple_h1', 'severity': 'warning', 'count': len(parser.h1_tags)})
    
    # Check Open Graph
    if not parser.og_tags:
        issues.append({'type': 'missing_og_tags', 'severity': 'medium'})
    elif 'og:url' not in parser.og_tags or not parser.og_tags.get('og:url', '').strip():
        issues.append({'type': 'missing_og_url', 'severity': 'medium'})
    
    # Check Schema.org
    if not parser.has_schema:
        issues.append({'type': 'missing_schema', 'severity': 'medium'})
    
    # Check images
    if parser.images_without_alt:
        issues.append({'type': 'images_without_alt', 'severity': 'medium', 'count': len(parser.images_without_alt)})
    
    # Check hreflang (for multilingual sites)
    if not parser.hreflang:
        issues.append({'type': 'missing_hreflang', 'severity': 'low'})
    
    return {
        'file': str(file_path),
        'title': parser.title,
        'meta_description': parser.meta_description,
        'canonical': parser.canonical,
        'h1_count': len(parser.h1_tags),
        'h2_count': len(parser.h2_tags),
        'og_tags': parser.og_tags,
        'has_schema': parser.has_schema,
        'hreflang_count': len(parser.hreflang),
        'images_without_alt_count': len(parser.images_without_alt),
        'issues': issues
    }

def main():
    workspace = Path('/workspace')
    
    # Find all HTML files (excluding landing folder and test files)
    html_files = []
    for html_file in workspace.glob('*.html'):
        if not any(skip in str(html_file) for skip in ['test-', 'fix-', 'admin', 'cookie-consent-dashboard']):
            html_files.append(html_file)
    
    # Add legal pages
    for html_file in (workspace / 'legal').glob('*.html'):
        html_files.append(html_file)
    
    results = []
    for html_file in sorted(html_files):
        result = analyze_html_file(html_file)
        results.append(result)
        print(f"Analyzed: {html_file.name}")
    
    # Save results
    output_file = workspace / 'seo' / 'crawl-results.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)
    
    print(f"\nResults saved to: {output_file}")
    print(f"Total files analyzed: {len(results)}")
    
    # Generate CSV report
    csv_file = workspace / 'seo' / 'findings.csv'
    with open(csv_file, 'w', encoding='utf-8') as f:
        f.write('File,Issue Type,Severity,Details,Status,Priority\n')
        for result in results:
            file_name = Path(result['file']).name
            for issue in result['issues']:
                issue_type = issue['type']
                severity = issue['severity']
                details = issue.get('value', issue.get('count', ''))
                priority = 'P0' if severity == 'critical' else 'P1' if severity == 'high' else 'P2'
                f.write(f'"{file_name}","{issue_type}","{severity}","{details}","open","{priority}"\n')
    
    print(f"CSV report saved to: {csv_file}")

if __name__ == '__main__':
    main()
