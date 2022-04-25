import React from "react";
import AnimalShow from "./show";
import errorImg from "../../src/error.png";

class AnimalList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActive: false,
      list: false,
    };
    this.handelAnimalClick = this.handelAnimalClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.defaultImg = this.defaultImg.bind(this);
  }

  defaultImg(e) {
    e.target.src = errorImg;
  }

  handelAnimalClick(e) {
    this.setState({ modalActive: e.currentTarget.id });
  }

  retShowModal(id) {
    return (
      <div onClick={this.closeModal} className="modal-backdrop">
        <div className="show-modal" onClick={(e) => e.stopPropagation()}>
          {" "}
          <AnimalShow
            closeModal={this.closeModal}
            loadAnimalList={this.props.loadAnimalList}
            id={id}
          />{" "}
        </div>
      </div>
    );
  }

  closeModal() {
    this.setState({ modalActive: false });
  }

  render() {
    if (!this.props.list) {
      return null;
    }

    return (
      <div className="main-list-div">
        {this.state.modalActive
          ? this.retShowModal(this.state.modalActive)
          : null}

        {this.props.list ? (
          this.props.list.map((res, idx) => (
            <div
              id={res.id}
              key={idx + "_animal"}
              className="animal-in-list"
              onClick={this.handelAnimalClick}
            >
              <div className="img-div">
                <img
                  onError={this.defaultImg}
                  className="animal_img"
                  src={res.imageURL}
                  alt=""
                />
              </div>

              <div className="list-tile-txt">
                <div>Common name: {res.commonName}</div>
                <div>ID: {res.id}</div>
              </div>
            </div>
          ))
        ) : (
          <div>List is loading...</div>
        )}
      </div>
    );
  }
}

export default AnimalList;
