import { useState, useEffect } from "react";
import { Flex, Text, Input, Button, InputGroup, Stack, Box, InputLeftElement, FormControl, InputRightElement, Spacer, chakra, Image, Heading, FormLabel } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa"
import './scss/Login.scss'
import axios from "axios";
import AlertDialogModal from "../../components/AlertModal";
import { setToken,serverUrl } from "../../components/TOKEN";


const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

const Login = ({isLogin,setisLogin,user,setUser}) => {
  let history = useHistory()
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  useEffect(() => {
    // console.log("확인")
    setShowPassword(false)
    if(isLogin){history.push('/home')}
  }, [])

  // input태그에 들어오는 user 정보로 업데이트
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const onChangeId = (e) => setUserId(e.target.value)
  const onChangePassword = (e) => setUserPassword(e.target.value)

  const [isOpen, setIsOpen] = useState(false)

  // 제출
  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      "password": userPassword,
      userId,
    }
    axios(
      {
        url : `${serverUrl}/v1/auth/login`,
        method: "POST",
        data,
      }
    )
    .then(({data}) => {
      setisLogin(true)
      localStorage.setItem('jwt', data.accessToken)
      localStorage.setItem('userId', userId)
      axios({
        url:`${serverUrl}/v1/users/me`,
        method:"GET",
        headers:setToken(),
      })
        .then(res=>{
          localStorage.setItem('user',JSON.stringify(res.data)) 
          setUser(res.data)
          setisLogin(true)
          history.push('/home')
        })
          // 비밀번호 빼고 저장하기 object -> string으로 저장되게 하기 사용할때는 parse를 이용
        .catch(err=>{
          console.log('App.js getme ERROR', err)
        })})

    .catch(err => {
      console.log("fail login", err)
      setIsOpen(true)
      setUserId('')
      setUserPassword('')
      history.push('login')
    })
  }


  return (
    <Flex className="login-flex">
      <AlertDialogModal title="로그인에 실패했습니다" content="아이디와 비밀번호를 다시 입력해주세요" isOpen={isOpen} setIsOpen={setIsOpen} />
      <Spacer/>
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center" >
          <form onSubmit={handleSubmit} className="login-justify-center">
            <Stack spacing={4} className="login-form">
              <Heading>Login</Heading>
              <Spacer/>
              <Text color="black" className="login-title">티칭마스터의 다양한 서비스를 누려보세요</Text>
              <Spacer/>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
                  <Input type="text" placeholder="아이디" onChange={onChangeId} value={userId} focusBorderColor="#B5A18C" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<CFaLock color="gray.300" />} />
                  <Input type={showPassword ? "text" : "password"} placeholder="비밀번호" onChange={onChangePassword} value={userPassword}  focusBorderColor="#B5A18C" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onMouseEnter={handleShowClick} onMouseLeave={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Spacer/>
              <Button borderRadius={0} type="submit" variant="solid" width="full" textColor="#F8F8F8" className="login-button" bgColor="#B5A18C" colorScheme="#5B360D">
                로그인
              </Button>
              <Box color="#B5A18C" className="login-justify-center">
                <Link className="login-link" to="/signup">회원가입</Link>
              </Box>
            </Stack>
          </form>
      </Stack>
      <Spacer/>
    </Flex>
  );
};

export default Login;