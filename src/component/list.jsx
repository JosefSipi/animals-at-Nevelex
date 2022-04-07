import React from "react";

class AnimalList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            list: false
        }

        this.renderList = this.renderList.bind(this)
        this.fetchAnimalListData = this.fetchAnimalListData.bind(this)
    }

    renderList(){
        if(this.state.list){
            return(
                <div> this will be the list</div>
            )
        }
    }

    async fetchAnimalListData(){

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const retValData = await fetch("https://animalrestapi.azurewebsites.net/Animal/List?candidateID=cc716bca-578b-4ea3-935b-4cabac7f9696", requestOptions)
        const theList = await retValData.json()
        this.setState({list: theList.list})

    }

    componentDidMount(){
        this.fetchAnimalListData()
    }

    render(){
        debugger

        return(
            <div className="main-list-div">
                this is my list component page
                {this.state.list ? this.state.list.map(res => <div key={res.commonName}>{res.commonName}</div>) : <div>List is loading...</div> }
            </div>
        )
    }
}

export default AnimalList