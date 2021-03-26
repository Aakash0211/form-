import React,{useState} from 'react'
import * as yup from 'yup'
import {useFormik} from 'formik'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Checkbox } from '@material-ui/core'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import InputAdornment from '@material-ui/core/InputAdornment'
import  {Redirect} from 'react-router-dom';

const Form = () => {
const [log,setLog]=useState(false)
  const [checked,setChecked]=useState(false)
  const [pass,setPass]=useState(true)
  const [logi,setLogi]=useState(false)
  
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });
 
  const formik=useFormik(
    {
      initialValues:{
        email:'',
        password:''
      },
      validationSchema:validationSchema,
      onSubmit:(values,actions)=>{
        setLogi(!logi)
      }
    }
  )
  if(logi){
    return <Redirect to={{pathname:'/log'}}/>
   }
  return (
    <div style={{ textAlign:'center',
        marginTop:150}}>
   {log ? (<Typography  variant="h4" style={{paddingBottom:20,fontWeight:'bold'}}>Log In</Typography>):((<div style={{marginRight:170}}><Typography style={{paddingBottom:5,fontWeight:'bold'}} variant="h4" >Create </Typography> 
   
    <Typography style={{paddingBottom:15,fontWeight:'bold'}} variant="h4">Account</Typography>
   </div>))}
      <form onSubmit={formik.handleSubmit} style={{display:'flex',justifyContent:'center',alignItems:'center',flex:1,flexDirection:'column'}}>
      <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      <TextField
          variant="outlined"
          id="email"
          name="email"
          label=" Your Email"
          style={{borderColor:'#ddd',
          borderWidth:1,
          borderRadius:5,
          margin:5,
          padding:11,
          width:290,
          maxHeight:70
         }}
         InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {!formik.errors.email && formik.values.email.length>0 && <CheckCircleOutlineOutlinedIcon fontSize='small'  color='primary' />}
            </InputAdornment>
          ),
        }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
    
     </div>
     <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <TextField
          variant="outlined"
          id="password"
          name="password"
          label="Password"
          type={pass ? 'password':'text'}
          style={{borderColor:'#ddd',
          borderWidth:1,
          borderRadius:5,
          padding:11,
          margin:5,
          width:290,
          maxHeight:70
         }}
         InputProps={{
          endAdornment: (
            <InputAdornment position="end">
             {pass ? <Button style={{width:3,paddingLeft:1}} onClick={()=>{setPass(!pass)}}><VisibilityOutlinedIcon fontSize='small' color='action' /></Button>:(<Button onClick={()=>{setPass(!pass)}}><VisibilityOffOutlinedIcon  fontSize='small' color='action' /></Button>)}
            </InputAdornment>
          ),
        }}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        
        </div>
        <div style={{ display:"flex",justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingHorizontal:20,paddingTop:10,paddingBottom:10}}>
        <Checkbox
         checked={checked}
         onChange={()=>{setChecked(!checked)}}
         color={checked ? "primary":'default'}
        />
        <Typography variant="inherit">I agree to the <Typography variant="inherit" style={{color:'blue',textDecorationLine:'underline'}}>Terms & Conditions</Typography> and <Typography variant="inherit" style={{color:'blue',textDecorationLine:'underline'}}>Privacy Policy</Typography></Typography>
        </div>
        {log ?(<Button color="primary" variant="contained" style={{padding:6,margin:7}} disabled={!checked}    type="submit">
          Log In
        </Button>):(<Button color="primary"  style={{padding:10,margin:10,width:290,maxHeight:60,borderRadius:15}} variant='outlined' disabled={!checked}  type='submit'>
          Create Account
        </Button>)}
        {!log && <Button  style={{padding:10,margin:10,width:290,maxHeight:60,borderRadius:15,borderColor:'blue'}} variant='outlined' >
         <div style={{padding:7}}> <img  alt ="Google" src="https://pics.freeicons.io/uploads/icons/png/2659939281579738432-512.png" style={{height:20,width:20}}/> </div> Sign Up With Google
        </Button>}

      {!log && (
       <div style={{marginTop:20}}>
      <Typography variant="inherit">Already have an account </Typography>
      <Button color="primary" variant='text'  onClick={()=>{setLog(!log)}}><Typography style={{textDecorationLine:'underline',textDecorationColor:'blue'}}>Log In</Typography></Button>
       </div>)}
      </form>
    </div>
  );
}

export default Form
