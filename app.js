var statename , districtname;

function callMe(){

    var stateid , districtid;
    var mid = document.querySelector(".mid");
    mid.textContent = "";

    fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states")
    .then( (response) => {
        return response.json();
    } )
    .then( (data) => {
        return data.states;
    } )
    .then( (w) => {
        for(let i = 0 ; i < w.length ; i++){
            if(w[i].state_name.toLowerCase() === statename.toLowerCase()){
                stateid = w[i].state_id;
                    return stateid;
            }
        }
    } )
    .then((u) => {
        
        fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/" + u)
        .then( (response) => {
            return response.json();
        } )
        .then((data) => {
            return data.districts;
        })
        .then( (p) => {
            for(let i = 0 ; i < p.length ; i++){
                let str = p[i].district_name.toLowerCase()
                if(str.includes(districtname.toLowerCase())){
                    districtid = p[i].district_id;
                        return districtid;
                }
            }
        } )
        .then((m) => {
            
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            
            today = dd + '-' + mm + '-' + yyyy;
            
            fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+ districtid +"&date=" + today)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data.sessions;
            })
            .then((w) => {

                if(w.length > 0){
                    for(let i = 0 ; i < w.length ; i++){
                        var insideDiv = document.createElement("div");
                        insideDiv.classList.add("insideDiv");
    
                        var insideHeader = document.createElement("div");
                        insideHeader.classList.add("insideHeader");
                        var insideName = document.createElement("h1");
                        var nameNode = document.createTextNode(w[i].name);
                        insideName.appendChild(nameNode);
    
                        var br = document.createElement("br");
                    
                        var hr = document.createElement("hr");
                        hr.classList.add("line");
    
                        insideHeader.appendChild(insideName);
                        insideHeader.appendChild(br);
                        insideHeader.appendChild(br);
                        insideHeader.appendChild(hr);
    
                        insideDiv.appendChild(insideHeader);
    
                        var insideMid = document.createElement("div");
                        insideMid.classList.add("insideMid");
    
                        var divPincode = document.createElement("div");
    
                        var insidePincode = document.createElement("h3");
                        var PincodeNode = document.createTextNode( "PINCODE : " + w[i].pincode);
                        insidePincode.appendChild(PincodeNode);
                        divPincode.appendChild(insidePincode);
                        insideMid.appendChild(divPincode);
    
                        var insideTime = document.createElement("h3");
                        var TimeNode = document.createTextNode("TIME : " + w[i].from + "-" + w[i].to);
                        insideTime.appendChild(TimeNode);
                        insideMid.appendChild(insideTime);
    
                        var insideFee = document.createElement("h3");
                        var FeeNode = document.createTextNode("FEE : Rs." + w[i].fee);
                        insideFee.appendChild(FeeNode);
                        insideMid.appendChild(insideFee);
    
                        var insideMinAge = document.createElement("h3");
                        var MinAgeNode = document.createTextNode("MIN AGE : " + w[i].min_age_limit);
                        insideMinAge.appendChild(MinAgeNode);
                        insideMid.appendChild(insideMinAge);
    
                        var insideVaccine = document.createElement("h3");
                        var VaccineNode = document.createTextNode("VACCINE : " + w[i].vaccine);
                        insideVaccine.appendChild(VaccineNode);
                        insideMid.appendChild(insideVaccine);
    
                        var insideCapacity = document.createElement("h3");
                        var CapacityNode = document.createTextNode("DOSES AVAILABLE : " + w[i].available_capacity);
                        insideCapacity.appendChild(CapacityNode);
                        insideMid.appendChild(insideCapacity);
    
                        insideDiv.appendChild(insideMid);
                        mid.appendChild(insideDiv);
                    }
                }
                else{
                    
                    let h1 = document.createElement("h1");
                    let textNode = document.createTextNode("No Sessions Today!");
                    h1.style.fontFamily = "sans-serif";
        
                    mid.style.alignItems = "center";
                    h1.appendChild(textNode);
                    mid.appendChild(h1);
                }
                
            })
            .catch((resolve) => {
                console.log(resolve);

                let h1 = document.createElement("h1");
                let textNode = document.createTextNode("State/District Not Found!");
                h1.style.fontFamily = "sans-serif";
    
                mid.style.alignItems = "center";
                h1.appendChild(textNode);
                mid.appendChild(h1);
            })

        })
        .catch((resolve) => {
            console.log(resolve);

            let h1 = document.createElement("h1");
            let textNode = document.createTextNode("District Not Found!");
            h1.style.fontFamily = "sans-serif";

            mid.style.alignItems = "center";
            h1.appendChild(textNode);
            mid.appendChild(h1);
        })
    })
    .catch( (resolve) => {
        console.log(resolve);

        let h1 = document.createElement("h1");
        let textNode = document.createTextNode("State Not Found!");
        h1.style.fontFamily = "sans-serif";

        mid.style.alignItems = "center";
        h1.appendChild(textNode);
        mid.appendChild(h1);
    } );

}


var main_button = document.querySelector(".main_button");

main_button.addEventListener('click' , () => {

    statename = document.querySelector(".state_name").value;
    districtname = document.querySelector(".district_name").value;
    callMe();
})