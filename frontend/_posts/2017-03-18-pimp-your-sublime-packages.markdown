---
title:  "Save yourself tedious work with better editor settings"
date:   2017-03-22 18:40
tags:
- text editor
- Sublime Text
- efficiency
excerpt: Our work usually consists of solving uncommon problems (which is something we can be later proud of), so as mechanical tasks or unfortunately dealing with pointless obstacles. Although it is impossible to avoid all the obstacles, we can reduce them greatly with good settings. So without further do, let's take a look on few strategies how to set our environment up and stop wasting valuable time and energy.
---
*This article is geared toward Sublime Text editor. If yours editor differs, you might still benefit from this article (get a sense what plugins is good to have and then search for similar ones designated for given editor).*

## Packages
Packages are easy and quick way how to enrich your editor with extra helpful, time saving functions. Here's the list of ones I recommend:

### Package control
The very first package you should install is [Package control](https://packagecontrol.io/installation). It allows you to search, install and maintain all the other plugins.
After installation you access its menu via hotkey `cmd + shift + P`. Then type _install_, chose `install package` and then start typing keywords or name of the plugin you want.

### Plugins for faster writing
Completely essential tools for any front-end developer. Instead of tedious writing of everything, these plugins with snippets and autocompletion will help you write faster and more efficienly (also with less mistakes :)). Hit just few key strokes, tab key and thing you wish will appear magically in front of your eyes.
Autocompletion is usually really well done and saves you tons of the time.

### [Emmet](https://packagecontrol.io/packages/Emmet) and [Emmet CSS snippets](https://packagecontrol.io/packages/Emmet%20Css%20Snippets)
TOP25 and for a good reason. Synonym of autocompletion. Download it, check documentation and give it a try. I also recommend printing [cheat sheet](http://docs.emmet.io/cheat-sheet/) and really learn how to get most of this tool. It's plainly invaluable.

#### [Sass](https://packagecontrol.io/packages/Sass)
This plugin add highlighting and autocompletion for Sass. It's in TOP25 most used plugins. If you use Sass and don't have this yet, download it now.

#### [SCSS](https://packagecontrol.io/packages/SCSS)
This one supports SCSS and it's in TOP100. Honestly, not sure if you get something extra if you already have previously mentioned Sass plugin (I have both of them for some time), but it doesn't impede anything.

#### [Stylus](https://packagecontrol.io/packages/Stylus)
If you use Stylus, this plugin is for you. TOP100.

### [Hayaku - tools for writing CSS faster](https://packagecontrol.io/packages/Hayaku%20-%20tools%20for%20writing%20CSS%20faster)
Another tool for expanding abbreviations, quite similar with Emmet. Abbreviations can be fuzzy, Hayaku will most likely guess what you were after. It supports CSS and preprocessors (Sass, Less, Stylus), too. There is no learnign curve - you just install it and write CSS faster than before. For more inspiration what you can do check [documentation](http://hayakubundle.com/).

### Plugins for keeping code clean
Good developers write code. Great developers write great, clean code. If you wanna be nice to your co-workers don't skimp on some code housekeeping. Afterall, it doesn't have to take much effort.

#### [SublimeLinter](https://packagecontrol.io/packages/SublimeLinter)
Linters are great tools for keeping eye on correct code formating. You need to set some rules initially, then during writing it warns you about some inconsitencies, breaking rules, indentation etc.
This plugin is a framework for concrete linters. It made it to the TOP25.

#### [Sublime​Linter-contrib-scss-lint](https://packagecontrol.io/packages/SublimeLinter-contrib-scss-lint)
Linter for SCSS I use. It is required to have `.scss-lint.yml` file in the root, where are specified linting rules for given project. Sublime (with this plugin) will then gently warn you (with a color dot next to line number) when you violate the rules. Warnings are not obtrusive so when you have a good reason for breaking the rule, you can ignore the warning easily. In bottom status bar you also get better description of violation and suggested solution. There is a great [article how to get up and running](https://www.sitepoint.com/getting-started-with-scss-lint/).

#### [EditorConfig](https://packagecontrol.io/packages/EditorConfig)
On similar note, [Sindre ‘evercoding’ Sorhus](https://github.com/sindresorhus) made plugin to help developers to have consistent coding/programming style accross various editors or IDEs. First decide and set the rules with your team, then save them in [configuration file](http://editorconfig.org/) in project's root folder.
The idea is that editors and IDEs with EditorConfig plugin will check for configuration file. If the editor finds it, it makes changes to your settings accordingly. With EditorConfig, you just indend with tab and editor will use soft/hard 2 or 4 tab width depending on the project settings. So you can code how you are used to, don't need to tweak settings all the time manually and you will avoid unnecessary diffs in git. Awesome, isn't it?

### General
Get more control or useful information for any kind of project.

#### [GitGutter](https://packagecontrol.io/packages/GitGutter)
Simple and so helpful plugin. All it does is indicate diffs next to line number. No need to check Git client to see, where something has changed.

#### [SidebarEnhancements](https://packagecontrol.io/packages/SideBarEnhancements)
Default sidebar in Sublime doesn't do pretty much anything, except showing file structure. This extension gives you more, rather useful, options like _copy path_, _find file named_, _duplicate_ and so on.

### Highlighting
Syntax highlighting is standard, but some advanced or custom settings might come handy.

#### [Generic Config](https://packagecontrol.io/packages/Generic%20Config)
In case you work with configuration files, you might appreciate this plugin, which brings syntax highlighting. It might sound like a no big deal, yet it can save you from lengthy search of forgotten quotes (causing project crashing).

#### [PersistentRegexHighlight](https://packagecontrol.io/packages/PersistentRegexHighlight)
This plugin will allow you to create regular expressions that will highlight for all documents. I use it for highlighting of words like _todo_, media-queries mixins and more.
After installation you need to configure it as you wish. You do it in _sublime text -> preferences -> package settings -> PersistentRegexHighlighting -> settings user_. It can then look like this:

```json
{
    // Please see the README for more information on settings.

    // Array of objects containing a regular expression
    // and an optional coloring scheme
    "regex": [{
            "pattern": "respond-to",
            "color_scope": "00FF00",
            "ignore_case": true,
            "underline": true
        },

        {
            "pattern": "todo",
            "color_scope": "FF0000",
            "ignore_case": true,
            "underline": true
        }],

    // If highlighting is enabled
    "enabled": true,

    // If highlighting should occur when a view is loaded
    "on_load": true,

    // If highlighting should occur as modifications happen
    "on_modify": true,

    // File pattern to disable on. Should be specified as Unix style patterns
    // Note, this looks at the absolute path to match the pattern. So if trying
    // ignore a single file (e.g. README.md), you will need to specify "**/README.md"
    "disable_pattern": [],

    // Maximum file size to run the the PersistentRegexHighlight on.
    // Any value less than or equal to zero will be treated as a non limiting value.
    "max_file_size": 0
}
```

## Did it help you?
Probably you already knew few tips, others might be new and greatly beneficial. Maybe you use great package or method I haven't mentioned. Or is there anything unclear and you would appreciate greater detail? In such cases, let me know in the comments.