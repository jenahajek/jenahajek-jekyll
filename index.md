---
layout: index
hometitle: Hi! My name is Jéňa Hájek
avatar: avatar.jpg
about: <p>and I am front-end architect from the beautiful Czech Republic (yet currently based in Nanning, China). I love participating on meaningful projects and that feeling when code grows under my typing hands. That's why I work with awesome <a href="http://proofreason.com">Proof&nbsp;&&nbsp;Reason</a> agency. When my keyboard is idle, I probably study, travel or exercise. <strong>If I think I have something valuable to say, I publish it here.</strong></p>
class: temporary
---

<ul class="main-nav">
{% assign navigation_pages = site.pages | sort: 'navigation_weight' %}
{% for p in navigation_pages %}
  {% if p.navigation_weight %}
      <li class="main-nav__item">
            <a class="main-nav__link" href="{{ p.url | relative_url }}">
                <h2 class="main-nav__title">{{ p.title | escape }}</h2>
                <p class="main-nav__desc">{{ p.about  | remove: '<p>' | remove: '</p>' }}</p>
            </a>
      </li>
    {% endif %}
  {% endfor %}
</ul>