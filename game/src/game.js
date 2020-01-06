
{% include_relative /src/core/main.js %}
{% include_relative /src/core/input.js %}
{% include_relative /src/core/utility.js %}
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

scripts.main = async function( ) {
    EnterRoom('start');
    DisableInterface();
    await Say('Typical...');
    await Say('...I enter the one escape room where there is no light...');
    await Say('...there must be a light switch somewhere?');
    EnableInterface();
};

var defaultGlobals = JSON.stringify(globals);
if( !LoadLastSave() ) {
    StartScript('main');
}