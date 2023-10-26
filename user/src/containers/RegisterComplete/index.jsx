import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Flex,
    Button,
    Divider,
    Heading,
    Box,
    Text,
} from '@chakra-ui/react'
import { ArrowForwardIcon} from '@chakra-ui/icons';
import {Form, Field, Formik} from 'formik';
import { useEffect, useState } from 'react';
import PasswordValidBox from '../../components/PasswordValidBox';
import lockedIMG from '../../assets/locked.svg'
import unlockedIMG from '../../assets/unlocked.svg'
import { useLocation } from 'react-router-dom';
import { register } from '../../utils/api';
import CompletedModal from '../../components/CompletedModal';


const RegisterComplete = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const [pwd,setPwd] = useState('');
  const [isPwdCheckOpen, setIsPwdCheckOpen] = useState(false);
  const [isPwdSN, setIsPwdSN] = useState(false);
  const [isPwdEC, setIsPwdEC] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  function togglePwdCheck(){
    setIsPwdCheckOpen(!isPwdCheckOpen);
  }
  const handlePwdChange = (event) => {
    setPwd(event.target.value);
  }
  useEffect(() => {
    const regexSN = /^(?=.*[!@#$%^&*0-9])/;
    const regexEC= /^.{8,}$/;
    if(regexSN.test(pwd)){
      setIsPwdSN(true);
    }else {
      setIsPwdSN(false);
    }
    if(regexEC.test(pwd)){
      setIsPwdEC(true);
    }else {
      setIsPwdEC(false);
    }
  },[pwd])
  function checkUsernameValidity(username) {
    let error;
    const regex = /(^[a-z][a-z]+$)|(^[a-z][a-z]+\d$)|(^[a-z][a-z]*\d\d+$)/i;
    if(!(regex.test(username))){
      error='This username is invalid';
    }
    return error;
  }
  function checkPwdMatching(value){
    let error;
    if(pwd!==value){
      error = 'Password does not match';
    }
    return error; 
  }
  return (
    <Flex justifyContent="center">
      <Flex border="0.5px solid #444" borderRadius="15px" justifyContent="center" mt="232px" mb="262px" flexDir="column" padding="84px 65px" >
        <Box>
          <Heading fontSize="1.5rem" color="#2D2D2D" fontWeight="800" textAlign="center">Just one more step..</Heading>
        </Box>
        <Box margin="18.5px">
          <Divider/>
        </Box>
        <Box>
          <Formik
            initialValues={{Username: "", Displayname: "", Password: "", ConfirmPassword: ""}}
            onSubmit={async (values, actions) => {
              const registerComplete = await register({
                Username: values.Username,
                Password: pwd,
                Displayname: values.Displayname,
                token: token
              })
              console.log(registerComplete);
              if(registerComplete.statusCode===400){
                alert(registerComplete.message)
                return;
              }
              openModal();
              actions.setSubmitting(false);
            }}
          > 
					{(props) => (
							<Form>
								<Flex flexDir="column" gap="25px" fontSize='0.875rem'>
									<Field name='Username' validate={checkUsernameValidity}>
										{({field,form}) => (
											<FormControl isInvalid={form.errors.Username && form.touched.Username} isRequired>
													<FormLabel display="flex">
														<Text fontWeight="500" fontSize='0.875rem'>Username</Text>
													</FormLabel>
													<Input 
                          w="330.453px" 
                          border="1px solid rgba(68,68,68,0.8)" 
                          borderRadius="8px" {...field} 
                          placeholder='username' 
                          />
                          <FormErrorMessage>{form.errors.Username}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
                  <Field name='Displayname' >
										{({field,form}) => (
											<FormControl isInvalid={form.errors.Displayname && form.touched.Displayname} isRequired>
													<FormLabel display="flex">
														<Text fontWeight="500" fontSize='0.875rem'>Displayname</Text>
													</FormLabel>
													<Input 
                          w="330.453px" 
                          border="1px solid rgba(68,68,68,0.8)" 
                          borderRadius="8px" {...field} 
                          placeholder='Display name' 
                          />
                          <FormErrorMessage>{form.errors.Displayname}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
                  <Field name='Password' >
                    {({field,form}) => (
                      <FormControl isInvalid={form.errors.Password && form.touched.Password} isRequired>
                        <FormLabel htmlFor="password" display="flex" alignItems="center">
                          <Text fontWeight="500" fontSize='0.875rem'>Password</Text>
                        </FormLabel>
                        <Input 
                          id="password"
                          w="330.453px"
                          border="1px solid rgba(68,68,68,0.8)" 
                          borderRadius="8px" {...field} type='password'
                          placeholder='password'
                          onFocus={togglePwdCheck}
                          onBlur={togglePwdCheck}
                          onChange={handlePwdChange}
                          value={pwd}
                        />
                      </FormControl>
                    )}
                  </Field>
                  {
                    (isPwdCheckOpen && !isPwdSN && !isPwdEC)  ? (
                      <PasswordValidBox image={lockedIMG} snBoxcolor="black" ecBoxColor="black" bgColor="valid.pink"/>
                    ) : null
                  }
                  {
                    (isPwdCheckOpen && !isPwdSN && isPwdEC)  ? (
                      <PasswordValidBox image={lockedIMG} snBoxcolor="black" ecBoxColor="valid.green.bright" bgColor="valid.pink"/>
                    ) : null                    
                  }
                  {
                    (isPwdCheckOpen && isPwdSN && !isPwdEC)  ? (
                      <PasswordValidBox image={lockedIMG} snBoxcolor="valid.green.bright" ecBoxColor="black" bgColor="valid.pink"/>
                    ) : null                    
                  }  
                  {
                    (isPwdCheckOpen && isPwdSN && isPwdEC)  ? (
                      <PasswordValidBox image={unlockedIMG} snBoxcolor="valid.green.bright" ecBoxColor="valid.green.bright" bgColor="valid.green.lowOpac"/>
                    ) : null                    
                  }                                       
									<Field name='ConfirmPassword' validate={checkPwdMatching}>
										{({field,form}) => (
												<FormControl isInvalid={form.errors.ConfirmPassword} isRequired>
													<FormLabel display="Flex">
														<Text fontWeight="500" fontSize='0.875rem'>Confirm Password</Text>
													</FormLabel>
													<Input 
                          border="1px solid rgba(68,68,68,0.8)" 
                          borderRadius="8px" {...field} 
                          type='password' 
                          placeholder='password'
                          />
                          <FormErrorMessage>{form.errors.ConfirmPassword}</FormErrorMessage>
												</FormControl>
										)}
									</Field>
								</Flex>
                <Button
                  mt='37px'
                  colorScheme='blackAlpha'
                  bgColor="#2D2D2D"
                  color="#FFFFFF"
                  isLoading={props.isSubmitting}
                  type='submit'
                  w="full"
                  borderRadius="20px"
                  fontWeight="600px"
                  fontSize="0.875rem"
                >
                  Continue 
                  <ArrowForwardIcon/>
                </Button>
							</Form>
						)
					}
					</Formik>
          <CompletedModal isOpen={isModalOpen} onClose={closeModal}/>
        </Box>
      </Flex>
    </Flex>
  );
}

export default RegisterComplete;