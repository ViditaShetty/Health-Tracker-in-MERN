import {React,useState,useEffect} from 'react';
import { Card, Stack } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import colors from 'assets/theme/base/colors';
import { FaEllipsisH } from 'react-icons/fa';
import linearGradient from 'assets/theme/functions/linearGradient';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

function ReferralTracking() {
	const { info, gradients } = colors;
	const { cardContent } = gradients;
	const [Button_is_clicked,setButtonIsClicked]=useState(false);
	const [Done_button,setDoneButton]=useState(true);
	const [weight, setWeight] = useState("60");
	const [height, setHeight] = useState("5.6");
	const [bmi, setBmi] = useState("30");
	const toggleEdit = () => setButtonIsClicked((b) => !b);
	const toggleDone = () => setB=Done_button((b) => !b);
	{/*useEffect(() => {
		setButtonIsClicked((b) => !b);//true to false and visa versa
		console.log("EDITABLE");
	  }, [Button_is_clicked]);*/}
	  {/*<VuiTypography color='white' variant='lg' fontWeight='bold'>
	  <input
		  className="MuiTypography-root MuiTypography-h4 MuiTypography-displayInline"
		  value={weight}
		  onChange={(e) => setWeight(e.target.value)}
	  />
	  <VuiTypography style={{ display: "none" }} />
		  <Button size="small" onClick={setButtonIsClicked(()=>true)}>
		  Done
		  </Button>
	</VuiTypography>*/}
return (
		<Card
			sx={{
				height: '100%',
				background: linearGradient(gradients.cardDark.main, gradients.cardDark.state, gradients.cardDark.deg)
			}}>
			<VuiBox sx={{ width: '100%' }}>
				<VuiBox
					display='flex'
					alignItems='center'
					justifyContent='space-beetween'
					sx={{ width: '100%' }}
					mb='40px'>
					<VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
						Profile
					</VuiTypography>
					<VuiBox
						display='flex'
						justifyContent='center'
						alignItems='center'
						bgColor='#22234B'
						sx={{ width: '37px', height: '37px', cursor: 'pointer', borderRadius: '12px' }}>
						<FaEllipsisH color={info.main} size='18px' />
					 <Button variant="text" onClick={()=>{setButtonIsClicked(true);setDoneButton(false)}}>EDIT</Button>
					</VuiBox>
				</VuiBox>
				<VuiBox
					display='flex'
					sx={({ breakpoints }) => ({
						[breakpoints.up('xs')]: {
							flexDirection: 'column',
							gap: '16px',
							justifyContent: 'center',
							alignItems: 'center'
						},
						[breakpoints.up('md')]: {
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'center'
						}
					})}>
					<Stack
						direction='column'
						spacing='20px'
						width='500px'
						maxWidth='50%'
						sx={({ breakpoints }) => ({
							mr: 'auto',
							[breakpoints.only('md')]: {
								mr: '75px'
							},
							[breakpoints.only('xl')]: {
								width: '500px',
								maxWidth: '40%'
							}
						})}>
							<VuiBox
							display='flex'
							width='180px'
							p='20px 22px'
							flexDirection='column'
							sx={({ breakpoints }) => ({
								background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
								borderRadius: '20px',
								[breakpoints.up('xl')]: {
									maxWidth: '110px !important'
								},
								[breakpoints.up('xxl')]: {
									minWidth: '180px',
									maxWidth: '100% !important'
								}
							})}>
							<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
								Weight
							</VuiTypography>
							{!Button_is_clicked?
							<VuiTypography color='white' variant='lg' fontWeight='bold'>
								{weight}kgs
							</VuiTypography>	
							:
							<VuiTypography color='blue' variant='lg' fontWeight='bold'>
							<input
								className="MuiTypography-root MuiTypography-h4 MuiTypography-displayInline"
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								color='blue'								
								style={{width:"50%"}}

							/>
							<VuiTypography style={{ display: "none" }} />
								<Button size="small"  onClick={()=>{setButtonIsClicked(true);setDoneButton(true)}}>
								
								</Button>
							</VuiTypography> 
							}					
						</VuiBox>
						<VuiBox
							display='flex'
							width='220px'
							p='20px 22px'
							flexDirection='column'
							sx={({ breakpoints }) => ({
								background: linearGradient(cardContent.main, cardContent.state, cardContent.deg),
								borderRadius: '20px',
								[breakpoints.up('xl')]: {
									maxWidth: '110px !important'
								},
								[breakpoints.up('xxl')]: {
									minWidth: '180px',
									maxWidth: '100% !important'
								}
							})}>
							<VuiTypography color='text' variant='button' fontWeight='regular' mb='5px'>
								Height
							</VuiTypography>
							{!Button_is_clicked?
							<VuiTypography color='white' variant='lg' fontWeight='bold'>
								{height}ft
							</VuiTypography>
							:
							<VuiTypography color='blue' variant='lg' fontWeight='bold'>
							<input
								className="MuiTypography-root MuiTypography-h4 MuiTypography-displayInline"
								value={height}
								onChange={(e) => setHeight(e.target.value)}
								color='blue'
								style={{width:"50%"}}
							/>
							<VuiTypography style={{ display: "none" }} />
								<Button size="small"  onClick={()=>{setButtonIsClicked(false);setDoneButton(true);var bmifloat=(parseInt(`${weight}`)/(parseFloat(`${height}`)*parseFloat(`${height}`)*0.0924));setBmi(parseInt(`${bmifloat}`))}}>
								Done
								</Button>
							</VuiTypography> 
							}	
						</VuiBox>
					</Stack>
					<VuiBox sx={{ position: 'relative', display: 'inline-flex',left:-20}}>
						<CircularProgress
							variant='determinate'
							value={70}
							size={window.innerWidth >= 1024 ? 200 : window.innerWidth >= 768 ? 170 : 200}
							color='info'	
						/>
						<VuiBox
							sx={{
								top: 0,
								left: 0,
								bottom: 0,
								right: 0,
								position: 'absolute',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center'
							}}>
							<VuiBox display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
								<VuiTypography color='text' variant='button' mb='4px'>
									BMI 
								</VuiTypography>
								
								<VuiTypography
									color='white'
									variant='d5'
									fontWeight='bold'
									mb='4px'
									sx={({ breakpoints }) => ({
										[breakpoints.only('xl')]: {
											fontSize: '32px'
										}
									})}>
									{bmi}
								</VuiTypography>
								<VuiTypography color='text' variant='button'>
									Total Score
								</VuiTypography>
							</VuiBox>
						</VuiBox>
					</VuiBox>
					<VuiTypography color='text' variant='button'>
					{parseInt(`${bmi}`) > 25?
							<>Decreasing weight by <span style={{color:"white",fontWeight:"900",fontSize:"xxl"}}>{(parseInt(`${bmi}`)-25)*(parseFloat(`${height}`))*(parseFloat(`${height}`))*0.1}</span> kgs will boost your health!</>
							:(
						    parseInt(`${bmi}`) < 19?
							<>Increasing  weight by  <span style={{color:"white",fontWeight:"900",fontSize:"xxl"}}>{(25-parseInt(`${bmi}`))*(parseFloat(`${height}`))*(parseFloat(`${height}`))*0.1}</span> kgs will boost your health!</>
							:
							<>Perfect BMI {bmi}</>)
							}
					</VuiTypography>		
				</VuiBox>
			</VuiBox>
			
		</Card>
	);
}

export default ReferralTracking;
