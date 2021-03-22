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
        marginTop:90}}>
   {log ? (<Typography  variant="h4" style={{paddingBottom:20}}>Log In</Typography>):((<Typography style={{paddingBottom:20}} variant="h4" >Create Account</Typography>))}
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
          margin:2,
          padding:11,
          width:290,
          maxHeight:70
         }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
     {!formik.errors.email && formik.values.email.length>0 && <CheckCircleOutlineOutlinedIcon fontSize='small'  color='primary' />}
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
          margin:2,
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
        <div style={{ display:"flex",justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingHorizontal:20}}>
        <Checkbox
         checked={checked}
         onChange={()=>{setChecked(!checked)}}
         color={checked ? "primary":'default'}
        />
        <Typography variant="inherit">I agree to the <Typography variant="inherit" style={{color:'blue',textDecorationLine:'underline'}}>Terms & Conditions</Typography> and <Typography variant="inherit" style={{color:'blue',textDecorationLine:'underline'}}>Privacy Policy</Typography></Typography>
        </div>
        {log ?(<Button color="primary" variant="contained" style={{padding:6,margin:7}} disabled={!checked}    type="submit">
          Log In
        </Button>):(<Button color="primary" variant="contained" style={{padding:6,margin:7}} disabled={!checked}  type='submit'>
          Create Account
        </Button>)}
        {!log && <Button color='secondary' style={{padding:6,margin:7}} variant="contained" >
          Sign Up With Google
        </Button>}

      {!log && (
       <div style={{marginTop:20}}>
      <Typography variant="inherit">Already have an account </Typography>
      <Button color="primary" variant='text'  onClick={()=>{setLog(!log)}}>Log In</Button>
       </div>)}
      </form>
    </div>
  );
}

export default Form
