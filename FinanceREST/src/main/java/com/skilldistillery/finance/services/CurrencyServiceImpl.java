package com.skilldistillery.finance.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class CurrencyServiceImpl implements CurrencyService {

	@Override
	public Map<String, Double> getCurrencies() {
		String[] currencies = { "GBP-USD", "EUR-USD", "USD-JPY", "AUD-USD", "EUR-GBP", "EUR-JPY" };
		Map<String, Double> currencyMap = new HashMap<>();
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
		String currencyScrape = sb.toString();
		for (int i = 0; i < currencies.length; i++) {
			String currencyRegex = currencies[i]
					+ " </div> </a>  </td>  <td class=\"data-table-row-cell\" data-type=\"value\">......";
			Pattern pattern = Pattern.compile(currencyRegex);
			Matcher matcher = pattern.matcher(currencyScrape);
			matcher.find();
			String currencyScrape2 = matcher.group(0);
			String currencyPositiveLookBack = "(?<=\"value\">).*";
			Pattern pattern2 = Pattern.compile(currencyPositiveLookBack);
			Matcher matcher2 = pattern2.matcher(currencyScrape2);
			matcher2.find();
			currencyMap.put(currencies[i], Double.parseDouble(matcher2.group(0)));
		}
		return currencyMap;
	}
}
