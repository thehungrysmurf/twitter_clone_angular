# single view and route that you will layer angular on top of

get '/' do
  erb :index
end

get '/users' do
  users = User.all
  myself = session['user']
  content_type :json
  { :users => users, :myself => myself }.to_json
end

post '/users' do
  user = JSON.parse(request.body.read)
  User.create(first_name: user['first_name'], last_name: user['last_name'], username: user['username'], password: user['password'])
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

get '/logout' do
  session['user'] = nil
  redirect to '/'
end

get '/tweets' do
    @tweets = Tweet.where(:username => session['user']).all
    content_type :json
    @tweets.to_json
end

post '/tweet' do
  if session['user'].nil?
    status = 404
  else
    tweet = JSON.parse(request.body.read)
    Tweet.create(username: session['user'], text: tweet['text']);
  end
end

get '/profile/:id' do
  if defined? params['id']
    user = User.find_by_id(params['id'])
    content_type :json
    user.to_json
  else
    redirect to '/profile'  
  end
end

get '/tweets/:id' do
  if defined? params['id']
    user = User.find_by_id(params['id'])
    @tweets = Tweet.where(:username => user.username)
    content_type :json
    @tweets.to_json
  else
    redirect to '/tweets' 
  end
end
