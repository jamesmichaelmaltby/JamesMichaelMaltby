---
layout: default
title: James Michael Maltby
permalink: /homepage
classes: homepage
---

<div class="jmm-tiles">
{% assign allitems = site.data.news | concat: site.posts %}
{% assign sorteditems = allitems | sort: 'date' | reverse %}
{% for news in sorteditems %}


{% if news.listed != false %}

<div class="jmm-tile">
<a {% if news.type != nil and news.type !='link' %}data-fancybox{% endif %}  href="{{ news.url }}">

<div class="jmm-tile__image" style="background-image:url({{ news.image }});">
{% if news.type %}
{% if news.type=='link' %}<svg><use xlink:href="#link-1" /></svg>{% endif %}
{% if news.type=='video' %}<svg><use xlink:href="#media-play-symbol" /></svg>{% endif %}
{% if news.type=='vr' %}<svg><use xlink:href="#arrow" /></svg>{% endif %}
{% if news.type=='audio' %}<svg><use xlink:href="#volume-up-interface-symbol" /></svg>{% endif %}
{% if news.type=='photo' %}<svg><use xlink:href="#photo-camera" /></svg>{% endif %}
{% if news.type=='download' %}<svg><use xlink:href="#cloud-download-symbol" /></svg>{% endif %}
{% endif %}
</div>
<div class="jmm-tile__caption">
<span class="jmm-tile__subtitle">{{ news.date | date: "%d %B %Y" }}</span>
<h2>
{{ news.title }}
</h2>
<p>
{{ news.excerpt }}
</p>
</div>
</a>
</div>

{% endif %}



{% endfor %}
</div>