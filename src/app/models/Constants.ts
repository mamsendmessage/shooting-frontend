export class Constants {
    public static APIAnonymousServerUrl: string = 'https://shooting-api.azurewebsites.net/anonymous'
    public static APIServerUrl: string = 'https://shooting-api.azurewebsites.net/api'
    public static BaseServerUrl: string = 'https://shooting-api.azurewebsites.net/'
    public static apiWithoutHeader: string[] = [
        '/auth/login',
        '/auth/signup',
    ];

    // public static APIAnonymousServerUrl: string = 'http://localhost:2024/anonymous'
    // public static APIServerUrl: string = 'http://localhost:2024/api'
    // public static BaseServerUrl: string = 'http://localhost:2024/'
    // public static apiWithoutHeader: string[] = [
    //     '/auth/login',
    //     '/auth/signup',
    // ];
}