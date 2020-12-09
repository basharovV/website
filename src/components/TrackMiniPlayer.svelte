<script>
    export let trackId;
    export let isDarkModeEnabled = false;
    export let accent = 'e60303';
</script>

<div
    style="background:{isDarkModeEnabled ? 'black' : 'white'};position: relative;border-radius: 15px;padding: 4px 6px;display: flex;align-items: center;margin: 4px 0;">
    <iframe
        style="background:{isDarkModeEnabled ? 'black' : 'white'};margin: auto;"
        width="100%"
        height="20"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/{trackId}&color=%23{accent}&inverse={isDarkModeEnabled ? 'true' : 'false'}&sharing=false&auto_play=false&hide_related=true&show_comments=true&show_user=false&show_reposts=false&show_teaser=false" />
    <div
        style="background:{isDarkModeEnabled ? 'black' : 'white'};width: 100px;height:20px;position:absolute;right: 5px;z-index:2;">
        <img
            style="float: right;height: 20px;margin-right: 10px;opacity: 0.5;"
            alt="soundcloud"
            src="soundcloud.svg" />
    </div>
</div>
