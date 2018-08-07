package com.skilldistillery.finance.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class StockServiceImpl {

	public void getCurrencies() {

		String[] currencies = { "GBP-USD", "EUR-USD", "USD-JPY", "AUD-USD", "EUR-GBP", "EUR-JPY" };
		List<Double> currenciesScraped = new ArrayList<>();
		StringBuilder sb = new StringBuilder();
		try {
			URL url = new URL("https://www.bloomberg.com/markets/currencies");
			URLConnection urlConn = url.openConnection();
			InputStreamReader inStream = new InputStreamReader(urlConn.getInputStream());
			BufferedReader br = new BufferedReader(inStream);
			String line;
			while ((line = br.readLine()) != null) {
				sb.append(line);
				line = br.readLine();
			}
			br.close();
		} catch (IOException e) {
			System.err.println(e.getMessage());
		}
			String newQuote = sb.toString();
			for (int i = 0; i < currencies.length; i++) {
				String regex2 = currencies[i]
						+ " </div> </a>  </td>  <td class=\"data-table-row-cell\" data-type=\"value\">......";
				Pattern pattern2 = Pattern.compile(regex2);
				Matcher matcher2 = pattern2.matcher(newQuote);
				System.out.println(matcher2.find());
				System.out.println(matcher2.group(0));
				String match2 = matcher2.group(0);
				String regex4 = "(?<=\"value\">).*";
				Pattern pattern4 = Pattern.compile(regex4);
				Matcher matcher4 = pattern4.matcher(match2);
				System.out.println(matcher4.find());
				System.out.println(matcher4.group(0));
				currenciesScraped.add(Double.parseDouble(matcher4.group(0)));
			}
			System.out.println(currenciesScraped);
	}
}
