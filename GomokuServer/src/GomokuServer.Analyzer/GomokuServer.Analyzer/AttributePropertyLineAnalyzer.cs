using System.Collections.Immutable;

using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;

namespace GomokuServer.Analyzer;

[DiagnosticAnalyzer(LanguageNames.CSharp)]
public class AttributePropertyLineAnalyzer : DiagnosticAnalyzer
{
	private static readonly DiagnosticDescriptor AttributePropertyLineRule = new DiagnosticDescriptor(
		id: "GOMOKU004",
		title: "Ensure property after attribute is on a new line",
		messageFormat: "Property '{0}' should be placed on a new line after its attribute.",
		category: "Formatting",
		defaultSeverity: DiagnosticSeverity.Warning,
		isEnabledByDefault: true,
		description: "Properties immediately following attributes should be placed on a new line for better readability.");

	public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics
		=> ImmutableArray.Create(AttributePropertyLineRule);

	public override void Initialize(AnalysisContext context)
	{
		context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
		context.EnableConcurrentExecution();

		// Register for syntax node analysis
		context.RegisterSyntaxNodeAction(AnalyzeProperty, SyntaxKind.PropertyDeclaration);
	}

	private static void AnalyzeProperty(SyntaxNodeAnalysisContext context)
	{
		var propertyDeclaration = (PropertyDeclarationSyntax)context.Node;

		// Check if the property has attributes
		if (propertyDeclaration.AttributeLists.Count == 0)
		{
			return;
		}

		// Get the last attribute's end line
		var lastAttribute = propertyDeclaration.AttributeLists.Last();
		var lastAttributeLine = lastAttribute.GetLocation().GetLineSpan().EndLinePosition.Line;

		// Get the property declaration's starting line
		var propertyStartLine = propertyDeclaration.GetLocation().GetLineSpan().StartLinePosition.Line;

		// Check if the property starts exactly on the same line as the last attribute
		if (lastAttributeLine == propertyStartLine)
		{
			// Report a diagnostic if the property is on the same line as the attribute
			var diagnostic = Diagnostic.Create(
				AttributePropertyLineRule,
				propertyDeclaration.GetLocation(),
				propertyDeclaration.Identifier.Text);

			context.ReportDiagnostic(diagnostic);
		}
	}
}
