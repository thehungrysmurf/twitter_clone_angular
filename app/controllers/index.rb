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

post '/login' do
    credentials = JSON.parse(request.body.read)
    if User.login(credentials['username'], credentials['password']) == 0
      puts "Login successful yay!"
    else
      puts "Login failed, maybe you should learn your models better eh?"
    end
end
