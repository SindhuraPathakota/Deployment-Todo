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
        isInEditMode: false,
        lables : [],
        editedText:'',

    }

    textOnChange=(e)=>{
        this.setState({editedText:e.target.value}) ;
        }
    handleDeleteLabel=async (label) =>{
        await http.delete(config.labelLink+"/"+label.lable_id);
        const { data : lables } = await http.get(config.getLableList);
        this.setState({ lables });
    }
    async componentDidMount() {
        const { data : lables } = await http.get(config.getLableList);
        this.setState({ lables });
      }
    
    onSubmit = async (e) => {
        e.preventDefault();
         
        if(this.state.title.length>=0 && this.state.color.length>=0)
        {
            const obj = { name: `${this.state.title}`,color : `${this.state.color}`};
            await http.post(config.postLable, obj);
            const { data : lables } = await http.get(config.getLableList);
            this.setState({ lables });
        }
        this.setState({ title: '' });
    }
    readColor = (color) => {
        this.state.color=color;
    }


    handleEditLabel=(label) =>{

        this.setState({eidtLabelId:label.lable_id,
            isInEditMode :!this.state.isInEditMode}) ;
    }
    handleClose=()=>{
        this.setState({isInEditMode:false});
        const { data :  lables} = http.get(config.labelLink);
        this.setState({ lables });
    }
    updateEditLabel= async (label) =>{

        
        let label_text='' ;
        if(this.state.editedText!='')
        {label_text=this.state.editedText;}
        else{label_text=label.lable_name}
        this.setState({isInEditMode:false,editedText:''});
        const obj = { label_text: `${label_text}`};  
        await http.put(config.labelLink+"/"+label.lable_id ,obj);
        const { data :  lables} = await http.get(config.getLableList);
        this.setState({ lables }); 
    }

    renderDefaultLabel =(label)=>{return  <p style={{backgroundColor:`${label.lable_color}`,   padding:' 6px',    width: '150px'}}>{label.lable_name}</p>}
    onChange = (e) => this.setState({ title: e.target.value });
    render()
    {
       return( 
       <React.Fragment>
         <div className="container">
            <ColorPicker parentCallback={this.readColor}/>
            <form  onSubmit={this.onSubmit}  style={{display: 'flex'},{width : '500px'},{marginBottom:'5px'}}>
             <input 
                    type="text" 
                    name="title"
                    style={{flex: '10'}}
                    placeholder="Enter Label Name..." 
                    value={this.state.title}
                    onChange={this.onChange}
                />            
                <input 
                    type="submit"
                    value="Submit"
                    className="btn btn-success"
                    style= {{flex: '1'},{marginLeft : '5px'}}
                />
                <br></br>
            </form>
            
            <div>
                <ul style={{display: 'grid',border: '1px solid black',padding: '10px',width:'70%'}}>
                     {this.state.lables.map((label) => (
                        <li  key={label.lable_id} style={{display: '-webkit-inline-box',   marginBottom: '15px'}}> 
                        {this.state.eidtLabelId===label.lable_id?this.state.isInEditMode ?   
                        <p>
                    <input type="text" defaultValue={label.lable_name}  style={{backgroundColor:`${label.lable_color}`}} onChange={this.textOnChange} ></input>
                    &nbsp;&nbsp; &nbsp;&nbsp;
                    <button className="btn btn-success" onClick={()=>this.updateEditLabel(label)}>Save</button> 
                    </p>
                    
                       :this.renderDefaultLabel(label):this.renderDefaultLabel(label) }
                       &nbsp;&nbsp; &nbsp;&nbsp;
                       <button className="btn btn-primary" disabled={this.state.isInEditMode?true:false} onClick={() => this.handleEditLabel(label)}>Edit</button>
                        
                            &nbsp;&nbsp;&nbsp; &nbsp;
                            
                            <button className="btn btn-danger" onClick={(e) => { if (window.confirm('Check if the label is assigned to the task')) this.handleDeleteLabel(label)}}>Delete</button>
                        
                        </li>
                     ))} 
                   </ul>
                </div>
                
            </div>
            </React.Fragment>
            )
    }
}



export default Lables;