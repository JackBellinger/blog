import Data.Aeson
import Data.File
import Data.Text (Text)
import Data.Text.IO
import System.Environment

data BlogMetadata = BlogMetadata {
    title :: Text,
    author :: Text,
    date :: Text,
	 excerpt :: Text,
    tags :: [Text]
}

instance FromJSON BlogMetadata where
    parseJSON = withObject "BlogMetadata" $ \obj ->
        BlogMetadata <$> parseJSON "title" obj <*> parseJSON "author" obj <*> parseJSON "date" obj <*> parseJSON "tags" obj

parseBlogMetadata :: FilePath -> IO [BlogMetadata]
parseBlogMetadata filePath = do
    contents <- readFile filePath
    return $ decode [BlogMetadata] contents

cleanBlogMetadata :: BlogMetadata -> BlogMetadata
cleanBlogMetadata post = post {
    title = cleanText $ title post,
    author = cleanText $ author post,
    date = cleanText $ date post,
    tags = map cleanText $ tags post
}

cleanText :: Text -> Text
cleanText text = Data.Text.pack $ filter (\c -> c == ' ' || c == '-' || c == '_' || isAlpha c || isDigit c) $ Data.Text.unpack text

generateInsertStatements :: [BlogMetadata] -> [Text]
generateInsertStatements posts = map formatInsertStatement posts

formatInsertStatement :: BlogMetadata -> Text
formatInsertStatement post = "INSERT INTO blog_posts (title, author, date, tags) VALUES ('" ++ Data.Text.unpack title post ++ "', '" ++ Data.Text.unpack author post ++ "', '" ++ Data.Text.unpack date post ++ "', '" ++ Data.Text.intercalate "," (map Data.Text.unpack (tags post)) ++ "');"

writeSQLFile :: Text -> FilePath -> IO ()
writeSQLFile sqlContent filePath = do
    writeFile filePath sqlContent

main :: IO ()
main = do
    args <- getArgs
    let filePath = head args
    metadata <- parseBlogMetadata filePath
    let cleanedMetadata = map cleanBlogMetadata metadata
    let insertStatements = generateInsertStatements cleanedMetadata
    let sqlContent = Data.Text.intercalate "\n" insertStatements
    writeSQLFile sqlContent "blog_metadata.sql"