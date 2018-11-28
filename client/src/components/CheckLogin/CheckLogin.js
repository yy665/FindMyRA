import {Component} from 'react';
import {withRouter} from 'react-router-dom'

class checkLogin extends Component {
    componentDidMount() {
         // 在这里请求相关接口判断用户是否完成登录
         var data = {
            username: "dong",
            password: "password"
        };

        fetch(`/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials':true,
              'Access-Control-Allow-Methods':'POST, GET',
              "Content-Type": "application/json"
            }
          }).then(res => res.json())
          .then(response => console.log('Sucess:' , JSON.stringify(response)))
          .catch(error=> console.log('Error:', error));
    }
    render() {
        return null;
    }
}

export default checkLogin;
