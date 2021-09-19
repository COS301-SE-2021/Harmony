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
							id="email"
							name="email"
							label="Email"
							onChange={handleChange("email")}
							defaultValue={values.email}
							fullWidth
							autoComplete="email"
						/>
					</Grid>

				</Grid>
			</React.Fragment>
		);
	}
}

export default AccountForm;
