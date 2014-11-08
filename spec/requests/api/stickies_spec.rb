# -*- encoding : utf-8 -*-
describe "Stickies API" do
  describe "GET /stickies" do
    it "returns all the stickies" do
      FactoryGirl.create :sticky, text: "Ladida"
      FactoryGirl.create :sticky, text: "Lorem Ipsum"

      get "/stickies", {}, { "Accept" => "application/json" }

      expect(response.status).to eq 200

      body = JSON.parse(response.body)
      stickies_text = body.map { |m| m["text"] }

      expect(stickies_text).to match_array(["Ladida",
                                           "Lorem Ipsum"])
    end
  end

  describe "POST /stickies" do
    it "creates a sticky" do
      sticky_params = {
        "sticky" => {
          "title" => "Indiana Jones and the Temple of Doom"
        }
      }.to_json

      request_headers = {
        "Accept" => "application/json",
        "Content-Type" => "application/json"
      }

      post "/stickies", sticky_params, request_headers

      expect(response.status).to eq 201 # created
      expect(Sticky.first.title).to eq "Indiana Jones and the Temple of Doom"
    end
  end
end
