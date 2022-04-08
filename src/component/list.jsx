import React from "react";
import AnimalShow from './show';

class AnimalList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            modalActive: false,
            list: false
        }
        this.handelAnimalClick = this.handelAnimalClick.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    handelAnimalClick(e){
        this.setState({modalActive: e.currentTarget.id})
    }

    retShowModal(id){
        return(
            <div onClick={this.closeModal} className="modal-backdrop">
                <div className="show-modal" onClick={(e) => e.stopPropagation()}> <AnimalShow id={id}/> </div>
            </div>
        )
    }

    closeModal(){
        this.setState({modalActive: false})
    }

    render(){
        debugger

        if(!this.props.list){
            return null
        }

        return(
            <div className="main-list-div">
                {this.state.modalActive ? this.retShowModal(this.state.modalActive) : null}

                {this.props.list ? this.props.list.map((res, idx) => 
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