require 'rubygems'
require 'sinatra/base'
require 'uri'
require 'mongo'
require 'erb'
require 'json'

class LandingPad < Sinatra::Base
  set :static, true
  set :public_folder, 'public'

  configure do
    # Admin settings - used to access contacts
    $admin_acct_name = ENV['ADMIN_LOGIN']
    $admin_acct_passwd = ENV['ADMIN_PASS']
    
    # Database settings - do NOT change these
    uri = URI.parse(ENV['MONGOHQ_URL'])
    conn = Mongo::Connection.from_uri(ENV['MONGOHQ_URL'])
    db = conn.db(uri.path.gsub(/^\//, ''))
    $collection = db.collection("contacts")
  end

  helpers do
    def protected!
      unless authorized?
        response['WWW-Authenticate'] = %(Basic realm="Restricted Area")
        throw(:halt, [401, "Not authorized\n"])
      end
    end

    def authorized?
      @auth ||=  Rack::Auth::Basic::Request.new(request.env)
      @auth.provided? && @auth.basic? && @auth.credentials && @auth.credentials == [$admin_acct_name, $admin_acct_passwd]
    end
  end
    
  get '/' do
    erb :index
  end

  get '/contacts' do
    protected!
    @contacts = $collection.find()
    erb :contacts
  end

  post '/subscribe' do
    content_type :json
    contact = params[:email]
    contact_type = contact.start_with?("@") ||
                  !contact.include?("@") ? "Twitter" : "Email"

    doc = {
      "name"    => params[:name],
      "contact" => contact,
      "type"    => contact_type,
      "referer" => request.referer,
    }
   
    $collection.insert(doc)
      {"success" => true, "type" => contact_type}.to_json
    end
end
