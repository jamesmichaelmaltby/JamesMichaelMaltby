
{% include_relative /src/core/main.js %}
{% include_relative /src/core/input.js %}
{% include_relative /src/core/utility.js %}
{% include_relative /src/core/audio.js %}
{% include_relative /src/core/rooms.js %}
{% include_relative /src/core/hotspots.js %}
{% include_relative /src/core/characters.js %}
{% include_relative /src/core/scripts.js %}
{% for file in site.static_files %}
{% if file.path contains '/rooms/' %}
(function() { 
  {% include_relative /src/rooms/{{ file.name }} %}
})();
{% endif %}
{% endfor %}