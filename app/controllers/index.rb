# single view and route that you will layer angular on top of

get '/' do
  erb :index
end

get '/users' do
  users = User.all
  content_type :json
  users.to_json
end

post '/users' do
  user = JSON.parse(request.body.read)
  User.create(first_name: user['first_name'], last_name: user['last_name'], username: user['username'], password: user['password'])
end

get '/profile' do
  if session[:username].nil?
    redirect '/error'
  else
    # call app.js to take me to profile.html
    puts "User is logged in, session created"     
  end
end

get '/error' do
  # call app.js to take me to error.html
  puts "Error! Not logged in"
end

post '/login' do
    credentials = JSON.parse(request.body.read)
    is_logged_in = User.login(credentials['username'], credentials['password'])
    if is_logged_in != nil
      puts "Login OK"
      session[:username] = is_logged_in
    else
      puts "Login failed!"
      session[:username] = nil
    end
end