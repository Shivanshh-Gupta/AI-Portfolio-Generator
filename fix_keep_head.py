#!/usr/bin/env python3
import os
import re

def fix_merge_conflicts_keep_head(directory):
    """Remove merge conflict markers, keeping HEAD version (advanced features)"""
    count = 0
    for root, dirs, files in os.walk(directory):
        # Skip node_modules and .git directories
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.next', 'dist']]
        
        for file in files:
            if file.endswith(('.jsx', '.js', '.css', '.json', '.ts', '.tsx')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Check if file has merge conflicts
                    if '<<<<<<< HEAD' in content:
                        # Remove conflict markers, keeping HEAD version (first part)
                        # Pattern: <<<<<<< HEAD\n(head content)\n=======\n(other content)\n>>>>>>> hash
                        pattern = r'<<<<<<< HEAD\n(.*?)\n=======\n.*?\n>>>>>>> [^\n]+\n?'
                        new_content = re.sub(pattern, r'\1\n', content, flags=re.DOTALL)
                        
                        with open(filepath, 'w', encoding='utf-8', newline='') as f:
                            f.write(new_content)
                        
                        count += 1
                        print(f"Fixed (kept HEAD): {filepath}")
                except Exception as e:
                    print(f"Error processing {filepath}: {e}")
    
    print(f"\n✅ Total files fixed: {count}")
    print("✅ All advanced features restored!")

if __name__ == '__main__':
    project_dir = r'c:\Users\ASUS\Downloads\AI Portfolio Generator'
    fix_merge_conflicts_keep_head(project_dir)
