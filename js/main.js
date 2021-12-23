jQuery(function(){
    let MonitorTypeBottuns = [];
    let LegendsViews = [];
    let MonitorOptions = [];

    LoadDataFromJson().then((obj)=>{
        MonitorTypeBottuns=obj.MonitorType;
        LegendsViews=obj.Legends;
        MonitorOptions=obj.Monitor;
        createButtons(MonitorTypeBottuns,MonitorOptions)

    })
})

async function LoadDataFromJson(){
    try {
        const response = await fetch("../json/Legends.json");
        if (!response.ok)
            throw Error("can't load the Legends.json");
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
}

function createButtons(MonitorTypeBottuns,MonitorOptions){
    $.each(MonitorTypeBottuns,( index, value )=>{
        console.log(value)
        $("<div/>",{
            "class":"dropdown",
            html:`
                <button class="btn btn-default dropdown-toggle" 
                type="button" id="dropdownMenu${index}" 
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                >
                    ${value.description}
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" id="dropdown-menu-${index}"></ul>
            `
        }).appendTo("div[class='menu']");
    })
    $.each(MonitorOptions, (index,value)=>{
        console.log(value);
        $("<li/>",{
            html:value.Name,
            "value":`${value.Name}`,
            click:function(){
                $(`button[id="dropdownMenu${value.MonitorTypeId}"]`).html(`
                    ${value.Name}
                    <span class="caret"></span>
                    `
                );
            }
        }).appendTo(`ul[id="dropdown-menu-${value.MonitorTypeId}"]`);
    })
}