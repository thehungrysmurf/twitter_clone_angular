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
  if session['user'].nil?
    status = 404
  else
    status = 200
    current_user = User.find_by_username(session['user'])
  content_type :json
  { :status => status, :current_user => current_user }.to_json
  end
end

post '/login' do
    credentials = JSON.parse(request.body.read)
    is_logged_in = User.login(credentials['username'], credentials['password'])
    if is_logged_in != nil
      status = 200
      session['user'] = is_logged_in
    else
      status = 400
      session['user'] = nil
    end
    { :status => status }.to_json
end