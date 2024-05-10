import * as signalR from "@microsoft/signalr"

const HUB_URL = "http://192.168.1.127:5234/devicesHub"

class SignalrConnection {
    constructor() {
        // field
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Debug)
            .withUrl(HUB_URL, {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .build();
        this.hubConnection.start().catch(err => console.error(err));
    }
    // singleton pattern to restrict instances
    static getInstance() {
        if (!SignalrConnection.instance) SignalrConnection.instance = new SignalrConnection();
        return SignalrConnection.instance;
    }
}
export default SignalrConnection.getInstance();