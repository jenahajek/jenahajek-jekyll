---
layout: index
hometitle: Hi! My name is Jéňa Hájek
description: <p>and I am front-end architect from the beautiful Czech Republic (yet currently based in Nanning, China). I love participating on meaningful projects and that feeling when code grows under my typing hands. That's why I work with awesome <a href="http://proofreason.com">Proof&nbsp;&&nbsp;Reason</a> agency. When my keyboard is idle, I probably study, travel or exercise. If I have something valuable to say, I publish it here.</p>
---

<ul class="main-nav">
    <p class="main-nav__category">Profesní</p>

{% assign navigation_pages = site.pages | sort: 'navigation_weight'%}

{% for p in navigation_pages %}
  {% if p.autogen == nil and p.navigation_weight > 0 %}
        {% if p.hr %}
            <p class="main-nav__category">Osobní</p>
        {% endif %}
      <li class="main-nav__item">
        <a class="main-nav__link" href="{{ p.url | relative_url }}">
            <h2 class="main-nav__title">{{ p.title | escape }}</h2>
            <p class="main-nav__desc">{{ p.description  | remove: '<p>' | remove: '</p>' }}</p>
        </a>
      </li>
    {% endif %}
  {% endfor %}
</ul>