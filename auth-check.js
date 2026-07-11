const fs = require('fs');
const path = require('path');
const envText = fs.readFileSync(path.resolve('.env'), 'utf8');
const env = envText.split(/\r?\n/).reduce((acc, line) => {
  const m = /^([^#=]+)=(.*)$/.exec(line);
  if (m) acc[m[1].trim()] = m[2].trim();
  return acc;
}, {});
const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('Missing env vars');
  process.exit(1);
}
const fetch = global.fetch || require('node-fetch');
(async () => {
  const email = 'smoke-test+20260709@example.com';
  const password = 'Test1234!';
  try {
    const signup = await fetch(`${url}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({ email, password }),
    });
    const signupBody = await signup.text();
    console.log('SIGNUP_STATUS', signup.status);
    console.log('SIGNUP_BODY', signupBody);
  } catch (err) {
    console.error('SIGNUP_ERROR', err.message || err);
  }
  try {
    const signin = await fetch(`${url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      body: new URLSearchParams({ email, password }).toString(),
    });
    const signinBody = await signin.text();
    console.log('SIGNIN_STATUS', signin.status);
    console.log('SIGNIN_BODY', signinBody);
  } catch (err) {
    console.error('SIGNIN_ERROR', err.message || err);
  }
})();
