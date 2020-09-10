window.TerdPlayer = class TerdPlayer extends VideoJSPlayer
    constructor: (data) ->
        if not (this instanceof TerdPlayer)
            return new TerdPlayer(data)

        @setupMeta(data)
        super(data)

    load: (data) ->
        @setupMeta(data)
        super(data)

    setupMeta: (data) ->
        data.meta.direct =
            # Quality is required for data.meta.direct processing but doesn't
            # matter here because it's dictated by the stream.  Arbitrarily
            # choose 480.
            480: [
                {
                    link: "ws://stream.terd.work/live/" + data.id + ".flv",
                    contentType: 'video/flv'
                }
            ]
