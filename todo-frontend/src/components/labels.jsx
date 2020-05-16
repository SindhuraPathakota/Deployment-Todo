import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ColorPicker from './colorpicker';
import config from '../config.json';
import http from "../services/httpService";

export class Lables extends Component
{
    state =
    {
        title : '',
        color :'',
        lables : []
    }
    async componentDidMount() {
        const { data : lables } = await http.get(config.getLableList);
        this.setState({ lables });
      }
    
    onSubmit = async (e) => {
        e.preventDefault();
         
        if(this.state.title.length>=0 && this.state.color.length>=0)
        {
            console.log(this.state.title);
            console.log(this.state.color);
            const obj = { name: `${this.state.title}`,color : `${this.state.color}`};
            await http.post(config.postLable, obj);
            const { data : lables } = await http.get(config.getLableList);
            this.setState({ lables });
        }
        this.setState({ title: '' });
    }
    readColor = (color) => {
        console.log(color)
    this.state.color=color;
    }

    onChange = (e) => this.setState({ title: e.target.value });
    render()
    {
       return( 
       <React.Fragment>
           <br></br>
       <form  onSubmit={this.onSubmit} style={{display: 'flex'},{width : '500px'},{margin:'5px'}}>
             <input 
                    type="text" 
                    name="title"
                    style={{flex: '10', padding: '5px'}}
                    placeholder="Enter Label Name..." 
                    value={this.state.title}
                    onChange={this.onChange}
                />
             
               
                <input 
                    type="submit"
                    value="Submit"
                    className="btn btn-success"
                    style= {{flex: '1'},{margin : '50px'}}
                />
                <br></br>
            </form>
            <ColorPicker parentCallback={this.readColor}/>
            <br></br>
            <br></br>
            <br></br>
            <table  className="table table-striped table-bordered table-hover container" style={{margin:'25px'}}>
                <thead>
                    <tr>
                    {this.state.lables.map((task) => (
<th  key={task.id} > <button style={{backgroundColor:`${task.lable_color}`}}>{task.lable_name}</button></th>
))} 
                    </tr>
                </thead>
                </table>
            </React.Fragment>
            )
    }
}



export default Lables;