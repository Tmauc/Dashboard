
function addSteamModal() {

}

function addSteamWidget() {

    const content = 
    `<div class="steamwidget card mb-4 border-left-primary">
        <div class="card-body py-3">
            <div class="dropdown no-arrow mb-4 ">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-h"> Edit</i>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" onclick="removeWidget()">Delete</a>
                </div>
            </div>
            <iframe src="https://store.steampowered.com/widget/383980/" frameborder="0" width ="646" height="190"></iframe>
        </div>
    </div>`;
    $("#root").append(content);
}

async function callSteam(gamename) {
    let appId = '';
    axios.get('http://api.steampowered.com/ISteamApps/GetAppList/v0002/')
    .then(async function (response) {
        console.log(user);
        appId = retrieveOui(response.data.applist, gamename);
        appId = appId.appid.toString();
        axios.get('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?format=json&appid=383980'/* + appId*/)
    });
}

function retrieveOui(applist, gamename) {
    applist.apps.find(x => x.name.toString().toLowerCase() === gamename.toLowerCase());
}

function removeWidget() {
    $(".steamwidget").remove();
}

function generateModal() {

}