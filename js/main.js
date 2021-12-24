// when the page is loaded
jQuery(function(){
    LoadDataFromJson().then((obj)=>{
        createButtons(obj.MonitorType);
        addOptionsToButton(obj.Monitor,obj.MonitorType,obj.Legends);
    }).catch((err)=> alert(err))
})

// Load the data from the json file with Promise
async function LoadDataFromJson(){
    try {
        const response = await fetch("../json/Legends.json");
        if (!response.ok)
            throw Error("can't load the Legends.json");
        return await response.json();
    } catch (err) {
        return console.error(err);
    }
}

// create the Buttons by the json and display them in the html
function createButtons(MonitorTypeBottuns){
    $.each(MonitorTypeBottuns,( index, value )=>{
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
    
}

// add options for each button by the json 
function addOptionsToButton(MonitorOptions,MonitorTypeBottuns,LegendsViews){
    $.each(MonitorOptions, (_index,value)=>{
        $("<li/>",{
            html:value.Name,
            "value":`${value.Name}`,
            click:function(){
                $(`button[id="dropdownMenu${value.MonitorTypeId}"]`).html(`
                    ${MonitorTypeBottuns[value.MonitorTypeId].description +' - '+value.Name}
                    <span class="caret"></span>
                    `
                );
                resetDropdownExceptID(MonitorTypeBottuns,value.MonitorTypeId);
                createViews(LegendsViews,MonitorTypeBottuns[value.MonitorTypeId],value.Name);
            }
        }).appendTo(`ul[id="dropdown-menu-${value.MonitorTypeId}"]`);
    })
}

// reset the dropdown values except the ID the user pressed on
function resetDropdownExceptID(MonitorTypeBottuns,MonitorTypeId){
    $.each(MonitorTypeBottuns,(index,item)=>{
        if(index!==MonitorTypeId){
            $(`button[id="dropdownMenu${index}"]`).html(`
                ${item.description}
                <span class="caret"></span>
                `
            );
        }
    }) 
}

// create View by the LegendId of the button
function createViews(LegendsViews,MonitorTypeBottun,optionName){
    view = LegendsViews.find(element => element.Id === MonitorTypeBottun.LegendId)
    $("div[class='view']").html("");
    $("div[class='view']").html(`
    <div class="view-title"> ${MonitorTypeBottun.Name + " - " + optionName}  <div/>
    `);
    $.each(view.tags,(_index, item)=>{
        $("<div/>",{
            "class":"row-view",
            html:`
                <svg width="10" height="10" >
                    <rect width="10" height="10" style="fill:${item.Color};" />
                </svg>
                <span>${item.Label}</span>
            `
        }).appendTo("div[class='view']");
    })
    $("div[class='view']").css("border"," 0.1rem solid")
}