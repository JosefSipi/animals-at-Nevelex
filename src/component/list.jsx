import React from "react";
import AnimalShow from './show';

class AnimalList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modalActive: false,
            list: false
        }

        this.fetchAnimalListData = this.fetchAnimalListData.bind(this)
        this.handelAnimalClick = this.handelAnimalClick.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    handelAnimalClick(e){

        this.setState({modalActive: e.currentTarget.id})

        debugger

    }

    closeModal(){
        this.setState({modalActive: false})
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
                {this.state.modalActive ? <div onClick={this.closeModal} className="modal-backdrop">
                    <div className="show-modal" onClick={(e) => e.stopPropagation()}> <AnimalShow id={Number(this.state.id)}/> </div>
                </div> : null}

                {this.state.list ? this.state.list.map((res, idx) => 
                    <div id={res.id} key={idx + '_animal'} className='animal-in-list' onClick={this.handelAnimalClick}>
                        <img className='animal_img' src={res.imageURL} alt="" />
                        <div>{res.id}</div>
                        <div>{res.commonName}</div>
                    </div>)
                : <div>List is loading...</div> }
            </div>
        )
    }
}

export default AnimalList