import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export class AccountForm extends Component {
	render() {
		const { values, handleChange } = this.props;
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
					Account Details
				</Typography>
				<Grid container spacing={24}>
					<Grid item xs={12}>
						<TextField
							required
							id="username"
							name="username"
							label="Username"
							onChange={handleChange("username")}
							defaultValue={values.username}
							fullWidth
							autoComplete="username"
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							required
							id="email"
							name="email"
							label="Email"
							onChange={handleChange("email")}
							defaultValue={values.email}
							fullWidth
							helperText="Passwords must be atleast 8 characters"
							autoComplete="email"
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							required
							id="password"
							name="password"
							label="Password"
							onChange={handleChange("password")}
							defaultValue={values.password}
							fullWidth

						/>
					</Grid>

				</Grid>
			</React.Fragment>
		);
	}
}

export default AccountForm;
