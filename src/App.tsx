import React, { useState, useEffect } from 'react';
import logo from './assets/icons/logo.svg';
import styles from './App.module.css';
// import robots from './mockdata/robots.json';
import Robot from './components/Robot';
import RobotDiscount from './components/RobotDiscount';
import ShoppingCart from './components/ShoppingCart';
interface Props {
  usr;
}
interface State {
  robotGallery: any[];
  count: number;
}
const App: React.FC = (props) => {
  const [robotGallery, setRobotGallery] = useState<any>([]);
  const [count, setcount] = useState<number>(0);
  const [loading, setLoding] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  useEffect(() => {
    const fetchData = async () => {
      setLoding(true);
      try {
        const respones = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await respones.json();
        setRobotGallery(data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
    setLoding(false);
  }, []);

  // * 生命周期第一阶段,初始阶段
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     robotGallery: [],
  //     count:0
  //   };
  // }
  // 在组件创建好DOM元素以后,挂载进页面的时候调用
  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => this.setState({ robotGallery: data }));
  // }
  // * 生命周期第二阶段:更新
  // 在组件接受到一个新的 prop(更新后)时被调用
  // componentWillReceiveRrops
  // state getDerivedStateFromProps(nextProps,prevState){}
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.some !== this.state.some;
  // }
  // 组件更新后调用
  // componentDidUpdate() {}

  // * 生命周期第三阶段:销毁
  // 组件销毁后调用
  // 可以当做 destructor 来使用
  // componentWillUnmount() {}

  // render() {
  return (
    <div className={styles.app}>
      <div className={styles.appHeader}>
        <img src={logo} className={styles.appLogo} alt="logo" />
        <h1>罗布特机器人炫酷吊炸天online购物平台 名字要长要狠</h1>
      </div>
      <button onClick={() => setcount(count + 1)}>Click</button>
      <span>count:{count}</span>
      <ShoppingCart />
      {(!error || error !== '') && <div>网站出错:{error}</div>}
      {!loading ? (
        <div className={styles.robotList}>
          {robotGallery.map((r, index) =>
            index % 2 === 0 ? (
              <RobotDiscount
                key={r.id}
                id={r.id}
                email={r.email}
                name={r.name}
              />
            ) : (
              <Robot key={r.id} id={r.id} email={r.email} name={r.name} />
            )
          )}
        </div>
      ) : (
        <h2>loding加载中</h2>
      )}
    </div>
  );
};
// }

export default App;
