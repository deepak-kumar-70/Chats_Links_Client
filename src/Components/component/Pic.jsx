import myImg from '../../assets/myimg.jpg'
const Pic = ({
  height,
  width,

}) => {
  return (
    <div><img src={myImg} className={`h-[50px] w-[50px] rounded-full object-cover`} /></div>
  )
}

export default Pic