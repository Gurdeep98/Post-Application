import React from 'react'

 const NewUser=()=>{
  return (
    <Grid xs={6}>
          <form className={classes.form} onSubmit={handleNewUserSubmit}>
            <Typography variant="h4">Create New User</Typography>
            <TextField
              label="Name"
              name="name"
              onChange={handleInputChange}
              value={newUser.name || ""}
              required
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              onChange={handleInputChange}
              value={newUser.email || ""}
              required
            />
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={newUser.gender || ""}
              onChange={handleInputChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <Button variant="contained" color="primary" type="submit">
              Create User
            </Button>
          </form>
        </Grid>
  )
}

export default NewUser;
