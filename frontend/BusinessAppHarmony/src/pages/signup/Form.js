import React from "react";
import AccountForm from "./AccountForm";
import VeriCodeForm from "./VeriCodeForm";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import { Auth } from "aws-amplify";
import { withRouter, Link } from 'react-router-dom';
const styles = theme => ({
	appBar: {
		position: "relative"
	},
	layout: {
		width: '100%',
		marginLeft: 0,


	},
	paper: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,

		[theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
			marginTop: theme.spacing.unit * 6,
			marginBottom: theme.spacing.unit * 6,
			padding: theme.spacing.unit * 1

		}
	},
	stepper: {
		padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing.unit * 3,
		marginLeft: theme.spacing.unit

	}
});

const steps = ["New Sign Up", "Verification Code"];


function getStepContent(step, values, handleChange) {
	switch (step) {
		case 0:
			return <AccountForm values={values} handleChange={handleChange} />;
		case 1:
			return <VeriCodeForm values={values} handleChange={handleChange} />;

		default:
			throw new Error("Unknown step");
	}
}

class Form extends React.Component {
	state = {
		activeStep: 0,
		email: "",
		code: "",
		password: "",
		username: "",
	};
	handleNext = async () => {
		if(this.state.activeStep==0){
			await Auth.signUp({username: this.state.username, password: this.state.password, attributes :{ email: this.state.email}}).then(e=>{
				this.setState(state => ({
					activeStep: state.activeStep + 1
				}));
			}).catch(e=> console.log(e))

		}else{
			if(this.state.activeStep==1){
				await Auth.confirmSignUp(this.state.username, this.state.code).then(e=>{
					//console.log(e)
					this.setState(state => ({
						activeStep: state.activeStep + 1
					}));
				}).catch(e=> console.log(e))
			}
		}

	};

	handleBack = () => {
		this.setState(state => ({
			activeStep: state.activeStep - 1
		}));
	};

	handleChange = input => e => {
		this.setState({ [input]: e.target.value });
	};

	render() {
		const { classes } = this.props;
		const { activeStep } = this.state;
		const { email, code, password, username} = this.state;
		const values = { email, code, password, username};

		return (
			<React.Fragment>

				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography component="h1" variant="h4" align="center">
							New Sign Up
						</Typography>
						<Stepper activeStep={activeStep} className={classes.stepper}>
							{steps.map(label => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>

						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									Welcome!
								</Typography>
								<Typography variant="subtitle1">
									Thank you for taking the time to register. We hope you enjoy Harmony !
								</Typography>
								<Button
									color="primary"
									size="large"
									className={classes.forgetButton}
									to="/login"
									component={Link}
									// onClick = {this.handleSignIn}}
								>
								Login
								</Button>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep, values, this.handleChange)}
								<div className={classes.buttons}>
									{activeStep !== 0 && (
										<Button
											onClick={this.handleBack}
											variant="outlined"
											className={classes.button}>
											Back
										</Button>
									)}
									<Button
										variant="contained"
										color="secondary"
										onClick={this.handleNext}
										className={classes.button}>
										{activeStep === steps.length - 1 ? "Submit" : "Next"}
									</Button>
								</div>
							</React.Fragment>
						)}
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Form);
