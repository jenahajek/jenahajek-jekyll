# Readme
## Minimalist theme for Jekyll multi site

This is my personal site where I store and publish my thoughts, ideas, projects or progess.

**Development:**
- main navigation is generated from pages, which have `navigation_weight` attribute. This attribute is also responsible for order of menu items.
- Each blog has its own folder (without underscore). Blog posts needs to have specified relevant category.
- archive of tags is **not** generated, it has to be added manually for each tag
1. for each blog is needed to make a tag archive (tagy.md) and folder ("tagy" or "tags") with used tags
2. update `_includes/tag-list.html`
3. update url for tag page in post/book template