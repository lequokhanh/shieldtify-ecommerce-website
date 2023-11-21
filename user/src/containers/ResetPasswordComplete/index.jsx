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
import { useLocation, useNavigate } from 'react-router-dom';
import CompletedModal from '../../components/CompletedModal';
import { useToast } from '@chakra-ui/react';
import checkValidToken from '../../utils/checkValidToken';
import { resetPassword } from '../../utils/api';


const ResetPasswordComplete = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
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
    function checkPwdMatching(value){
        let error;
        if(pwd!==value){
            error = 'Password does not match';
        }
        return error; 
    }
    useEffect(() => {
        let isMounted = true;
        const checkValid = async () => {
            try {
                await checkValidToken(token,'reset-password');
            } catch (error) {
            if (isMounted) {
                if (error.response && error.response.data && (error.response.data.statusCode === 400 || error.response.data.statusCode  === 500)) {
                const popupTime = new Promise((resolve) => {
                    setTimeout(() => resolve(200), 3000)
                })
                toast.promise(popupTime, {
                    success: { title: 'Success', description: 'Redirected' },
                    error: { title: 'Promise rejected', description: 'Something wrong' },
                    loading: { title: 'Invalid token', description: 'Redirecting to Homepage' },
                })
                setTimeout(() => {
                    navigate('/');
                },5000)
                }
            }
        }
    };
        checkValid();
        return () => {
            isMounted = false;
        };
    },[]);
    return (
    <Box h="100vh">
        <Flex 
        border="0.5px solid #444" 
        borderRadius="15px" 
        justifyContent="center" 
        mt="150px"  
        mb="200px"
        flexDir="column" 
        padding="84px 65px" 
        >
            <Box>
                <Heading fontSize="1.5rem" color="#2D2D2D" fontWeight="800" textAlign="center">Reset password</Heading>
            </Box>
            <Box marginTop="18.5px"  marginBottom="18.5px">
                <Divider/>
            </Box>
            <Formik
            initialValues={{Password: "", ConfirmPassword: ""}}
            onSubmit={async (values, actions) => {
                try{
                    await resetPassword(token,pwd)
                    openModal();
                }catch(e){
                    console.log(e);
                }
                actions.setSubmitting(false);
            }}
            >
            {(props) => (
                <Form>
                    <Flex flexDir="column" gap="25px" fontSize='0.875rem'>
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
                            <FormLabel display="Flex" fontWeight="500" fontSize='0.875rem'>
                                Confirm Password
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
                    fontWeight="600"
                    fontSize="0.875rem"
                    >
                        Continue 
                        <ArrowForwardIcon/>
                    </Button>
                </Form>
            )}
            </Formik>
            <CompletedModal isOpen={isModalOpen} onClose={closeModal}/>
        </Flex>
    </Box> 
    )
}

export default ResetPasswordComplete;