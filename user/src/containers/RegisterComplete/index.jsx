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
const RegisterComplete = () => {
  const [username, setUsername] = useState('');
  const [pwd,setPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [isPwdCheckOpen, setIsPwdCheckOpen] = useState(false);
  const [isPwdSN, setIsPwdSN] = useState(false);
  const [isPwdEC, setIsPwdEC] = useState(false);
  const lockedIMG = "locked.svg";
  const unlockedIMG = "unlocked.svg";

  function togglePwdCheck(){
    setIsPwdCheckOpen(!isPwdCheckOpen);
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  } 
  const handlePwdChange = (event) => {
    setPwd(event.target.value);
  }
  const handleConfirmPwdChange = (event) => {
    setConfirmPwd(event.target.value);
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
    const regex = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){4,15}[a-zA-Z0-9]$/;
    if(!regex.test(username)){
      error='This username is invalid';
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
            initialValues={{Username: "", Password: "", ConfirmPassword: ""}}
            // onSubmit={(values, action) => {
            //   }}
          > 
					{(props) => (
							<Form>
								<Flex flexDir="column" gap="25px" fontSize='0.875rem'>
									<Field name='Username' validate={checkUsernameValidity}>
										{({field,form}) => (
											<FormControl isInvalid={form.errors.Username && form.touched.Username}>
													<FormLabel>
														<Text fontWeight="500" fontSize='0.875rem'>Username</Text>
													</FormLabel>
													<Input 
                          w="330.453px" 
                          border="1px solid rgba(68,68,68,0.8)" 
                          borderRadius="8px" {...field} 
                          placeholder='username *' 
                          onChange={handleUsernameChange}
                          value={username}
                          />
                          <FormErrorMessage>{form.errors.Username}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Field name='Password'>
										{({field,form}) => (
												<FormControl isInvalid={form.errors.Password && form.touched.Password}>
													<FormLabel>
														<Text fontWeight="500" fontSize='0.875rem'>Password</Text>
													</FormLabel>
                            <Input 
                            w="330.453px"
                            border="1px solid rgba(68,68,68,0.8)" 
                            borderRadius="8px" {...field} type='password'
                            placeholder='password *'
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
									<Field name='ConfirmPassword'>
										{({field,form}) => (
												<FormControl isInvalid={form.errors.ConfirmPassword && form.touched.ConfirmPassword}>
													<FormLabel>
														<Text fontWeight="500" fontSize='0.875rem'>Confirm Password</Text>
													</FormLabel>
													<Input 
                          border="1px solid rgba(68,68,68,0.8)" 
                          borderRadius="8px" {...field} 
                          type='password' 
                          placeholder='password *'
                          onChange={handleConfirmPwdChange}
                          value={confirmPwd}
                          />
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
        </Box>
      </Flex>
    </Flex>
  );
}

export default RegisterComplete;