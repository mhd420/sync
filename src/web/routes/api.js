import CyTubeUtil from '../../utilities';
import * as HTTPStatus from '../httpstatus';

export default function initialize(app, channelIndex) {
    app.get('/api/channel/:channel.json', (req, res) => {
        if (!req.params.channel || !CyTubeUtil.isValidChannelName(req.params.channel)) {
            return res.status(HTTPStatus.NOT_FOUND).json({
                error: `Channel "${req.params.channel}" does not exist.`
            });
        }

        channelIndex.listPublicChannels().then((channels) => {
            var chan = channels.find((channel) => { return (channel.name == req.params.channel) });

            if (chan) {
                res.json(chan);
            }
            else
            {
                return res.status(HTTPStatus.NOT_FOUND).json({
                    error: `Channel "${req.params.channel}" does not exist.`
                });
            }
        }).catch(err => {
            Logger.errlog.log(err.stack);
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                error: err.message
            });
        });
    });

    app.get('/api/channels.json', (req, res) => {
        
        channelIndex.listPublicChannels().then((channels) => {
            var results = {
                "total_channels": channels.length,
                "channels": channels,
            };

            res.json(results);
        }).catch(err => {
            Logger.errlog.log(err.stack);
            return res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
                error: err.message
            });
        });
    });
}
