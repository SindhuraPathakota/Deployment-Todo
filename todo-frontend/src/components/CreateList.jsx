import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class addList extends Component
{
    state =
    {
        title : ''
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addList(this.state.title);
        this.setState({ title: '' });
    }

    onChange = (e) => this.setState({ title: e.target.value });
    render()
    {
       return( <form onSubmit={this.onSubmit} style={{display: 'flex',margin:'25px  25px 25px 25px',width:'500px'}}>
                <input 
                    type="text" 
                    name="title"
                    style={{flex: '10', padding: '5px'}}
                    placeholder="Create List..." 
                    value={this.state.title}
                    onChange={this.onChange}
                />
                <input 
                    type="submit"
                    value="Submit"
                    className="btn success"
                    style= {{flex: '1'}}
                />
                <br></br>
            </form>
            )
    }
}


addList.PropTypes = {
    addList : PropTypes.func.isRequied
}
export default addList;