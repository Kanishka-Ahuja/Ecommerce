document.addEventListener('DOMContentLoaded', function () {
    
    countervalue()

    let favoriteTag = document.getElementsByClassName('favicon')

    favoriteTag = Array.from(favoriteTag)

    favoriteTag.forEach(async (tag) => {

        let id = tag.id
        id = id.replace('fav', '')
        await correctfav(id)

    })

    let cartTag = document.getElementsByClassName('carticon')

    cartTag = Array.from(cartTag)

    cartTag.forEach(async (tag) => {

        let id = tag.id
        id = id.replace('cart', '')
        await correctcart(id)

    })

});

const countervalue=  async()=>{

    let req = new XMLHttpRequest()
    req.open('GET','/cart/countitems')
    req.send()

    req.addEventListener('load',()=>{

        if(req.status===200){
            
            let response = req.responseText
            response = JSON.parse(response)
            let counter = document.getElementById('counter')
            let footercounter = document.getElementById('footercounter')
            if(response.length != 0){
                counter.innerHTML = response.length
                footercounter.innerHTML = response.length
            }
            else{
                counter.innerHTML = ''
                footercounter.innerHTML = ''
            }
        }
    })

}

const correctfav = async (id) => {

    let req = new XMLHttpRequest()
    req.open('GET', `/favorite/isfav?id=${id}`)
    req.send()

    req.addEventListener('load', () => {

        if (req.status === 200) {

            let response = req.responseText
            response = JSON.parse(response)

            let favicon = document.getElementById(`fav${id}`)
            

            if (response.val == 1) {

                favicon.setAttribute('class', 'favicon fa-solid fa-heart fa-xl')
                favicon.setAttribute('style', "color:red")
                favicon.addEventListener('click',(event)=>{
                    removefromfav(event)
                })

            } else {

                favicon.setAttribute('class', 'favicon fa-regular fa-heart fa-xl')
                favicon.setAttribute('style', "color:#3b363594")
                favicon.addEventListener('click',(event)=>{
                    addtofav(event)
                })
            }
        }
    })
}

function addtofav(event) {

    id = event.target.id
    if(id.includes('heart')){
        id = id.replace('heart','')
    }
    if(id.includes('fav')){
        id = id.replace('fav','')
    }

    let req = new XMLHttpRequest()
    req.open('POST', '/favorite/addtofav')
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({ id: id }))

    req.addEventListener('load',async () => {
       
        if(req.status===200){
           await correctfav(id)
           if(ID.includes('heart')){
            let hearticon = document.getElementById(`heart${id}`)
            hearticon.setAttribute('class', 'favIcon fa-solid fa-heart fa-2xl')
            hearticon.setAttribute('style', "color:red")
            hearticon.addEventListener('click',(event)=>{
                removefromfav(event)
            })
        }
        }

    })

}

function removefromfav(event) {

    id = event.target.id
    ID = id
    if(id.includes('heart')){
        id = id.replace('heart','')
    }
    if(id.includes('fav')){
        id = id.replace('fav','')
    }

    let req = new XMLHttpRequest()
    req.open('POST', '/favorite/removefromfav')
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({ id: id }))

    req.addEventListener('load', async() => {

        if (req.status === 200) {
            await correctfav(id)
            if(ID.includes('heart')){
                let hearticon = document.getElementById(`heart${id}`)
                hearticon.setAttribute('class', 'favIcon fa-regular fa-heart fa-2xl')
                hearticon.setAttribute('style', "color:#3b363594")
                hearticon.addEventListener('click',(event)=>{
                    addtofav(event)
                })
            }
        }

    })
}

const correctcart = async (id) => {

    let req = new XMLHttpRequest()
    req.open('GET', `/cart/incart?id=${id}`)
    req.send()

    req.addEventListener('load', () => {

        if (req.status === 200) {

            let response = req.responseText
            response = JSON.parse(response)

            let carticon = document.getElementById(`cart${id}`)
            

            if (response.val == 1) {

                carticon.setAttribute('style', "color:brown")
                carticon.addEventListener('click',(event)=>{
                    removefromcart(event)
                })

            } else {

                carticon.setAttribute('style', "color:#3b363594")
                carticon.addEventListener('click',(event)=>{
                    addtocart(event)
                })
            }
        }
    })
}

function addtocart(event) {

    id = event.target.id
    ID = id
    if(id.includes('ATC')){
        id = id.replace('ATC','')
    }
    if(id.includes('cart')){
        id = id.replace('cart','')
    }

    let req = new XMLHttpRequest()
    req.open('POST', '/cart/addProduct')
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({ id: id }))

    req.addEventListener('load', async() => {
       
        if(req.status===200){
            let response  = req.responseText
            response = JSON.parse(response)
            console.log("response = ",response)
            let counter = document.getElementById('counter')
            let footercounter = document.getElementById('footercounter')
            if(response.length != 0){
                counter.innerHTML = response.length
                footercounter.innerHTML = response.length
            }
            else{
                counter.innerHTML = ''
                footercounter.innerHTML = ''
            }
            if(ID.includes('ATC')){
                let carticon = document.getElementById(`ATC${id}`)
                carticon.style.backgroundColor = "brown"
                carticon.addEventListener('click',(event)=>{
                    removefromcart(event)
                })
            }
            
           await correctcart(id)
        }

    })

}

function removefromcart(event) {

    id = event.target.id
    ID = id
    if(id.includes('ATC')){
        id = id.replace('ATC','')
    }
    if(id.includes('cart')){
        id = id.replace('cart','')
    }

    let req = new XMLHttpRequest()
    req.open('POST', '/cart/removeProduct')
    req.setRequestHeader("Content-Type", "application/json")
    req.send(JSON.stringify({ id: id }))

    req.addEventListener('load', async() => {
       
        if(req.status===200){
            let response  = req.responseText
            response = JSON.parse(response)
            console.log("response = ",response)
            let counter = document.getElementById('counter')
            let footercounter = document.getElementById('footercounter')
            if(response.length != 0){
                counter.innerHTML = response.length
                footercounter.innerHTML = response.length
            }
            else{
                counter.innerHTML = ''
                footercounter.innerHTML = ''
            }
           await correctcart(id)
           if(ID.includes('ATC')){
            let carticon = document.getElementById(`ATC${id}`)
            carticon.style.backgroundColor = "#3b363594"
            carticon.addEventListener('click',(event)=>{
                addtocart(event)
            })
        }
        }

    })

}


function detailsData(data) {

    return `
    <div id="leftdiv" onclick=getdetails("${data.Url}",0)></div>
    <div id="details">
    <i id="heart${data.Url}" class="favIcon fa-regular fa-heart fa-2xl" style="color: #3b363594;"></i>
        <i class="closeIcon fa-solid fa-xmark fa-2xl" style="color: #3b363594;" onclick=hidedetails()></i>
        <img id="ImageDetails"  src="../${data.Url}">
        <p id="PriceDetails">${data.Price}</p>
        <p id="TitleDetails">${data.Title}</p>
        <p id="DescriptionDetails">${data.Description}</p>
        <div id="ATC${data.Url}" class="ATCdiv" >ADD TO CART <i id="DetailsATCIcon"class="fa-solid fa-cart-plus" style="color: #ffffff;"></i></div>
        <div id="BuyNowdiv" >BUY NOW <i id="BuyNowIcon"class="fa-solid fa-money-bills" style="color: #ffffff;"></i></div>
    </div>
    <div id="rightdiv" onclick=getdetails("${data.Url}",2)></div>   
    `
}

function getdetails(id, pos) {

    document.body.scrollTop = 0;

    let req = new XMLHttpRequest();

    req.open("GET", `/product/getproducts?id=${id}&pos=${pos}`)

    req.send();

    req.addEventListener("load", function () {

        if (req.status === 200) {

            let dialogbox = showdetails()

            let data = req.responseText

            console.log(data)
            if (data) {
                data = JSON.parse(data)
                dialogbox.innerHTML = detailsData(data);

                let favicon =  document.getElementById(`fav${data.Url}`)
                let detailsFavIcon =  document.getElementById(`heart${data.Url}`)
                favicon_classes = favicon.classList

                favtype = favicon_classes[1]

                if(favtype =='fa-solid')
                {
                    detailsFavIcon.setAttribute("style",'color:red')
                    detailsFavIcon.addEventListener('click',(event)=>{
                        removefromfav(event)
                    })
                }
                else{
                    detailsFavIcon.setAttribute("style",'color:#3b363594')
                    detailsFavIcon.addEventListener('click',(event)=>{
                        addtofav(event)
                    })
                }

                detailsFavIcon.setAttribute('class',`favIcon ${favtype} fa-heart fa-2xl`)
                console.log(detailsFavIcon)

                let carticon =  document.getElementById(`cart${data.Url}`)
                let detailsCarticon =  document.getElementById(`ATC${data.Url}`)

                let cartcolor =  carticon.style.color
                detailsCarticon.style.backgroundColor = cartcolor
                
                if(cartcolor == 'brown' ){

                    detailsCarticon.addEventListener('click',(event)=>{
                        removefromcart(event)
                    })
                }
                else{
                    detailsCarticon.addEventListener('click',(event)=>{
                        addtocart(event)
                    })
                }

            }
            else {
                hidedetails()
            }
        }
    })
}

function hidedetails() {

    let dialogbox = document.getElementById('dialogbox')
    dialogbox.setAttribute('style', 'display:none;')
    let grid = document.getElementById('grid')
    grid.setAttribute('style', 'display:grid;')
    document.body.setAttribute('style', 'background:white;')

}

function showdetails() {

    let dialogbox = document.getElementById('dialogbox')
    dialogbox.setAttribute('style', 'display:flex;')
    let grid = document.getElementById('grid')
    grid.setAttribute('style', 'display:none;')
    document.body.setAttribute('style', ' background: linear-gradient( to bottom right,#f5bf6e3b,#413b3516)')
    return dialogbox;

}

