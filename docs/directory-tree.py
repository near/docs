import os
import errno

def path_hierarchy(path):
    hierarchy = {'path': path}

    try:
        hierarchy[path[2:]] = [
            path_hierarchy(os.path.join(path, contents))
            for contents in os.listdir(path)
        ]
    except OSError as e:
        if e.errno != errno.ENOTDIR:
            raise

    return hierarchy

if __name__ == '__main__':
    import json
    import sys

    try:
        directory = sys.argv[1]
    except IndexError:
        directory = "."

    f= open("../website/sidebars.json","w+")
    f.write(json.dumps(path_hierarchy(directory), indent=2, sort_keys=True))