import React from 'react';
import axios from 'axios';
import '../App.css';
import { Checkbox } from 'antd';

class ClassifyImageCard extends React.Component {
    state = {
        term: '',
        currentType: this.props.image.type,
        isTrain: true,
    };

    makePostRequest = async (id, type) => {
        let params = {
          id: id,
          type: type,
          isTrain: this.state.isTrain,
        }
        console.log(params);
        let res = await axios.put(`${process.env.REACT_APP_API_URL}/images/?image_id=${id}&type=${type}`);
        console.log(res.data);
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.term);
        this.setState({currentType: this.state.term});
        this.makePostRequest(this.props.image.id, this.state.term);
    }

    onCheckChange = (e) => {
        console.log(e);
        this.setState({isTrain: !e.target.checked});
        console.log(this.state.isTrain);
    }

    render() {
        return (
            <div className="ui segment">
                <img id={this.props.image.id} src={this.props.image.url} />
                <form onSubmit={(event) => this.onFormSubmit(event)} className="ui form">
                    <div className="field">
                        <label> { this.state.currentType } </label>
                        <input 
                            type="text" 
                            value={this.state.term}
                            onChange={e=>this.setState({term: e.target.value})}
                        />
                        <Checkbox onChange={this.onCheckChange}>Test</Checkbox>
                    </div>
                </form>
            </div>
        );
    }
}

export default ClassifyImageCard;