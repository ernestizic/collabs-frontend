import axios from "axios";
import Pusher from "pusher-js";

const app_key = process.env.NEXT_PUBLIC_PUSHER_KEY as string;
const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string;

export const pusher = new Pusher(app_key, {
	cluster: cluster,
	forceTLS: true,
	channelAuthorization: {
		endpoint: `${process.env.NEXT_PUBLIC_API_BASE_URL}pusher/auth`,
		transport: "ajax",
		customHandler: (params, callback) => {
			axios
				.post(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}pusher/auth`,
					{
						socket_id: params.socketId,
						channel_name: params.channelName,
					},
					{
						withCredentials: true,
					}
				)
				.then((response) => {
					// Pass the successful response data to the Pusher callback
					callback(null, response.data);
				})
				.catch((error) => {
					// Pass any errors to the Pusher callback
					callback(new Error(`Pusher auth error: ${error.message}`), error);
				});
		},
	},
});
